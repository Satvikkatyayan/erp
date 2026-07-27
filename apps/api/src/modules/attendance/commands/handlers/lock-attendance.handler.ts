import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { LockAttendanceCommand } from '../lock-attendance.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';
import { OperationalExceptionOrchestrator } from '../../services/exceptions/operational-exception.orchestrator';

@Injectable()
export class LockAttendanceHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService,
    private readonly reviewService: AttendanceReviewService,
    private readonly exceptionOrchestrator: OperationalExceptionOrchestrator
  ) {}

  async execute(command: LockAttendanceCommand) {
    return this.prisma.$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      const fromState = muster.workflowStatus as MusterWorkflowStatus;
      const toState = MusterWorkflowStatus.LOCKED;

      this.stateMachine.validateTransition({
        from: fromState,
        to: toState,
        actorId: command.actorId,
        actorRoles: command.actorRoles
      });

      const isEligible = await this.reviewService.isEligibleForFinalLock(command.musterId, tx);
      if (!isEligible && fromState === MusterWorkflowStatus.UNDER_REVIEW) {
        throw new BadRequestException('Cannot lock. Final review eligibility not met.');
      }

      const hasCriticalExceptions = await this.exceptionOrchestrator.hasUnresolvedCriticalExceptions(command.musterId, tx);
      if (hasCriticalExceptions) {
        throw new BadRequestException('Cannot lock attendance. There are unresolved critical exceptions.');
      }

      const updatedMuster = await tx.dailySiteMuster.update({
        where: { id: command.musterId },
        data: { workflowStatus: toState }
      });

      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceLocked',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.reason,
          previousState: fromState,
          currentState: toState,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceLifecycleEvent(
        'AttendanceLocked',
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
