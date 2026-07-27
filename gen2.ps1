$basePath = "d:\erpvvinfratech\apps\api\src\modules\attendance\commands\handlers"

$standard = @(
  @("submit-attendance", "SubmitAttendance", "MusterWorkflowStatus.SUBMITTED", "AttendanceSubmitted"),
  @("validate-attendance", "ValidateAttendance", "MusterWorkflowStatus.VALIDATED", "AttendanceValidated"),
  @("request-correction", "RequestCorrection", "MusterWorkflowStatus.CORRECTION_REQUESTED", "AttendanceCorrectionRequested"),
  @("approve-correction", "ApproveCorrection", "MusterWorkflowStatus.REOPENED", "AttendanceCorrectionApproved"),
  @("reject-correction", "RejectCorrection", "MusterWorkflowStatus.LOCKED", "AttendanceCorrectionRejected"),
  @("reopen-attendance", "ReopenAttendance", "MusterWorkflowStatus.REOPENED", "AttendanceReopened")
)

foreach ($item in $standard) {
  $kebab = $item[0]
  $name = $item[1]
  $toState = $item[2]
  $eventName = $item[3]

  $content = @"
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { AttendanceLifecycleEvent } from '../../events/attendance-lifecycle.events';
import { MusterWorkflowStatus } from '@prisma/client';
import { $($name)Command } from '../$kebab.command';

@Injectable()
export class $($name)Handler {
  constructor(
    private readonly prisma: PrismaService,
    private readonly stateMachine: AttendanceStateMachine,
    private readonly eventBus: EventBusService
  ) {}

  async execute(command: $($name)Command) {
    return this.prisma.`$transaction(async (tx) => {
      const muster = await tx.dailySiteMuster.findUnique({ where: { id: command.musterId } });
      if (!muster) throw new BadRequestException('Muster not found');

      const fromState = muster.workflowStatus as MusterWorkflowStatus;
      const toState = $($toState);

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
          action: '$($eventName)',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.reason,
          previousState: fromState,
          currentState: toState,
          version: 1
        }
      });

      this.eventBus.publish(new AttendanceLifecycleEvent(
        '$($eventName)',
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
"@
  Set-Content -Path "$basePath\$kebab.handler.ts" -Value $content
}

$startReview = @"
import { Injectable, BadRequestException } from '@nestjs/common';
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
    return this.prisma.`$transaction(async (tx) => {
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
"@
Set-Content -Path "$basePath\start-review.handler.ts" -Value $startReview


$lockAttendance = @"
import { Injectable, BadRequestException } from '@nestjs/common';
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
    return this.prisma.`$transaction(async (tx) => {
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
"@
Set-Content -Path "$basePath\lock-attendance.handler.ts" -Value $lockAttendance

$completeReviewCmd = @"
import { AttendanceReviewStatus } from '@prisma/client';
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
"@
Set-Content -Path "d:\erpvvinfratech\apps\api\src\modules\attendance\commands\complete-review.command.ts" -Value $completeReviewCmd

$completeReviewHandler = @"
import { Injectable, BadRequestException } from '@nestjs/common';
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
    return this.prisma.`$transaction(async (tx) => {
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

      await tx.musterTimeline.create({
        data: {
          musterId: command.musterId,
          action: 'AttendanceReviewAction',
          actorId: command.actorId,
          timestamp: new Date(),
          reason: command.remarks,
          previousState: 'UNDER_REVIEW',
          currentState: 'UNDER_REVIEW',
          version: 1
        }
      });

      return { success: true };
    });
  }
}
"@
Set-Content -Path "$basePath\complete-review.handler.ts" -Value $completeReviewHandler
