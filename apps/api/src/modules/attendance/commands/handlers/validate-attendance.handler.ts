import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { ValidateAttendanceCommand } from '../validate-attendance.command';

@Injectable()
export class ValidateAttendanceHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService
  ) {}

  async execute(command: ValidateAttendanceCommand) {
    return this.prisma.$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      const fromState = muster.workflowStatus as MusterWorkflowStatus;
      const toState = MusterWorkflowStatus.VALIDATED;

      this.stateMachine.validateTransition({
        from: fromState,
        to: toState,
        actorId: command.actorId,
        actorRoles: command.actorRoles
      });

      const updatedMuster = await tx.dailySiteMuster.update({
        where: { id: command.musterId },
        data: { workflowStatus: toState }
      });

      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceValidated',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.reason,
          previousState: fromState,
          currentState: toState,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceLifecycleEvent(
        'AttendanceValidated',
        command.correlationId,
        {
          musterId: command.musterId,
          actorId: command.actorId,
          fromState,
          toState,
          reason: command.reason
        }
      ));

      return updatedMuster;
    });
  }
}
