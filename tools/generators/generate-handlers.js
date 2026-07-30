const fs = require('fs');
const path = require('path');

const basePath = 'd:\\erpvvinfratech\\apps\\api\\src\\modules\\attendance\\commands\\handlers';

const commandsInfo = [
  { name: 'SubmitAttendance', toState: 'MusterWorkflowStatus.SUBMITTED', eventName: 'AttendanceSubmitted' },
  { name: 'ValidateAttendance', toState: 'MusterWorkflowStatus.VALIDATED', eventName: 'AttendanceValidated' },
  { name: 'RequestCorrection', toState: 'MusterWorkflowStatus.CORRECTION_REQUESTED', eventName: 'AttendanceCorrectionRequested' },
  { name: 'ApproveCorrection', toState: 'MusterWorkflowStatus.REOPENED', eventName: 'AttendanceCorrectionApproved' },
  { name: 'RejectCorrection', toState: 'MusterWorkflowStatus.LOCKED', eventName: 'AttendanceCorrectionRejected' },
  { name: 'ReopenAttendance', toState: 'MusterWorkflowStatus.REOPENED', eventName: 'AttendanceReopened' },
];

function generateStandardHandler(name, toState, eventName) {
  const kebab = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  return `import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { ${name}Command } from '../${kebab}.command';

@Injectable()
export class ${name}Handler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService
  ) {}

  async execute(command: ${name}Command) {
    return this.prisma.$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      const fromState = muster.workflowStatus as MusterWorkflowStatus;
      const toState = ${toState};

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
          action: '${eventName}',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.reason,
          previousState: fromState,
          currentState: toState,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceLifecycleEvent(
        '${eventName}',
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
`;
}

// Generate standard handlers
commandsInfo.forEach(cmd => {
  const kebab = cmd.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
  fs.writeFileSync(path.join(basePath, \`\${kebab}.handler.ts\`), generateStandardHandler(cmd.name, cmd.toState, cmd.eventName));
});

// StartReviewHandler (injects ReviewService)
fs.writeFileSync(path.join(basePath, 'start-review.handler.ts'), `import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { StartReviewCommand } from '../start-review.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';

@Injectable()
export class StartReviewHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService,
    private readonly reviewService: AttendanceReviewService
  ) {}

  async execute(command: StartReviewCommand) {
    return this.prisma.$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      const fromState = muster.workflowStatus as MusterWorkflowStatus;
      const toState = MusterWorkflowStatus.UNDER_REVIEW;

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

      await this.reviewService.startReviewProcess(command.musterId, command.correlationId, tx);

      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceReviewStarted',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.reason,
          previousState: fromState,
          currentState: toState,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceLifecycleEvent(
        'AttendanceReviewStarted',
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
`);

// LockAttendanceHandler
fs.writeFileSync(path.join(basePath, 'lock-attendance.handler.ts'), `import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { LockAttendanceCommand } from '../lock-attendance.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';

@Injectable()
export class LockAttendanceHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService,
    private readonly reviewService: AttendanceReviewService
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

      // Verify Final Review Eligibility
      const isEligible = await this.reviewService.isEligibleForFinalLock(command.musterId, tx);
      if (!isEligible && fromState === MusterWorkflowStatus.UNDER_REVIEW) {
        throw new BadRequestException('Cannot lock. Final review eligibility not met.');
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
`);

// CompleteReviewCommand + Handler
const completeReviewCmdPath = 'd:\\erpvvinfratech\\apps\\api\\src\\modules\\attendance\\commands\\complete-review.command.ts';
fs.writeFileSync(completeReviewCmdPath, `import { AttendanceReviewStatus } from '@prisma/client';
export class CompleteReviewCommand {
  constructor(
    public readonly musterId: string,
    public readonly actorId: string,
    public readonly actorRoles: string[],
    public readonly decision: AttendanceReviewStatus,
    public readonly remarks: string,
    public readonly correlationId: string,
  ) {}
}
`);

fs.writeFileSync(path.join(basePath, 'complete-review.handler.ts'), `import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { CompleteReviewCommand } from '../complete-review.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';

@Injectable()
export class CompleteReviewHandler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly reviewService: AttendanceReviewService
  ) {}

  async execute(command: CompleteReviewCommand) {
    return this.prisma.$transaction(async (tx) => {
      // Find the specific role of the actor attempting the review
      // In reality, this requires an intersection of actorRoles with the REVIEW_ROLES_ORDER.
      // We will assume the primary role matches one of the review roles.
      const reviewerRole = command.actorRoles.find(r => ['HR', 'COORDINATOR', 'VC', 'OWNER'].includes(r));
      if (!reviewerRole) throw new BadRequestException('Actor does not have a valid review role.');

      await this.reviewService.recordDecision(
        command.musterId,
        command.actorId,
        reviewerRole,
        command.decision,
        command.remarks,
        command.correlationId,
        tx
      );

      // Write timeline entry for the review action
      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceReviewAction',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.remarks,
          previousState: 'UNDER_REVIEW', // Unchanged
          currentState: 'UNDER_REVIEW', // Unchanged
          version: 1
        }
      });

      return { success: true };
    });
  }
}
`);
