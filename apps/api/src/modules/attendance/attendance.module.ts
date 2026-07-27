import { Module } from '@nestjs/common';

// Services
import { AttendanceQueryService } from './services/attendance-query.service';
import { AttendanceLifecycleService } from './services/attendance-lifecycle.service';
import { AttendanceCalculationService } from './services/attendance-calculation.service';
import { PlatformAttendanceSDK } from './sdk/platform-attendance.sdk';
import { AttendanceTimelineService } from './services/attendance-timeline.service';
import { ShiftService } from './services/shift.service';
import { AttendanceSnapshotService } from './services/attendance-snapshot.service';
import { AttendanceInitializationService } from './services/attendance-initialization.service';
import { AttendanceStateMachine } from './services/attendance-state-machine.service';
import { AttendanceReviewService } from './services/attendance-review.service';
import { AttendanceHealthService } from './services/attendance-health.service';
import { OperationalExceptionOrchestrator } from './services/exceptions/operational-exception.orchestrator';

// Detectors
import { ShiftViolationDetector } from './services/exceptions/detectors/shift-violation.detector';
import { MissingAttendanceDetector } from './services/exceptions/detectors/missing-attendance.detector';
import { MissingCheckoutDetector } from './services/exceptions/detectors/missing-checkout.detector';
import { DuplicatePunchDetector } from './services/exceptions/detectors/duplicate-punch.detector';
import { AssignmentConflictDetector } from './services/exceptions/detectors/assignment-conflict.detector';
import { WrongSiteDetector } from './services/exceptions/detectors/wrong-site.detector';
import { HolidayConflictDetector } from './services/exceptions/detectors/holiday-conflict.detector';
import { LateSubmissionDetector } from './services/exceptions/detectors/late-submission.detector';
import { UnauthorizedCorrectionDetector } from './services/exceptions/detectors/unauthorized-correction.detector';
import { OvertimeThresholdDetector } from './services/exceptions/detectors/overtime-threshold.detector';

// Commands
import { CreateDailySiteMusterCommandHandler } from './commands/create-daily-site-muster.command';
import { SubmitAttendanceHandler } from './commands/handlers/submit-attendance.handler';
import { ValidateAttendanceHandler } from './commands/handlers/validate-attendance.handler';
import { StartReviewHandler } from './commands/handlers/start-review.handler';
import { CompleteReviewHandler } from './commands/handlers/complete-review.handler';
import { LockAttendanceHandler } from './commands/handlers/lock-attendance.handler';
import { RequestCorrectionHandler } from './commands/handlers/request-correction.handler';
import { ApproveCorrectionHandler } from './commands/handlers/approve-correction.handler';
import { RejectCorrectionHandler } from './commands/handlers/reject-correction.handler';
import { ReopenAttendanceHandler } from './commands/handlers/reopen-attendance.handler';
import { GenerateAttendanceSummaryHandler } from './commands/handlers/generate-attendance-summary.handler';

// Core
import { EventsModule } from '../../core/events/events.module';


// Repositories
import { DailySiteMusterRepository } from './repositories/daily-site-muster.repository';
import { MusterSnapshotRepository } from './repositories/muster-snapshot.repository';
import { AttendanceDayRepository } from './repositories/attendance-day.repository';
import { AttendanceSessionRepository } from './repositories/attendance-session.repository';
import { AttendancePunchRepository } from './repositories/attendance-punch.repository';
import { AttendanceReviewRepository } from './repositories/attendance-review.repository';
import { MusterTimelineRepository } from './repositories/muster-timeline.repository';
import { EmployeeTimelineRepository } from './repositories/employee-timeline.repository';
import { AttendanceSummaryRepository } from './repositories/attendance-summary.repository';

const repositories = [
  DailySiteMusterRepository,
  MusterSnapshotRepository,
  AttendanceDayRepository,
  AttendanceSessionRepository,
  AttendancePunchRepository,
  AttendanceReviewRepository,
  MusterTimelineRepository,
  EmployeeTimelineRepository,
  AttendanceSummaryRepository,
];

@Module({
  imports: [EventsModule],
  providers: [
    AttendanceQueryService,
    AttendanceLifecycleService,
    AttendanceCalculationService,
    PlatformAttendanceSDK,
    AttendanceTimelineService,
    ShiftService,
    AttendanceSnapshotService,
    AttendanceInitializationService,
    AttendanceStateMachine,
    AttendanceReviewService,
    AttendanceHealthService,
    OperationalExceptionOrchestrator,
    ShiftViolationDetector,
    MissingAttendanceDetector,
    MissingCheckoutDetector,
    DuplicatePunchDetector,
    AssignmentConflictDetector,
    WrongSiteDetector,
    HolidayConflictDetector,
    LateSubmissionDetector,
    UnauthorizedCorrectionDetector,
    OvertimeThresholdDetector,
    {
      provide: 'EXCEPTION_DETECTORS',
      useFactory: (
        d1: ShiftViolationDetector,
        d2: MissingAttendanceDetector,
        d3: MissingCheckoutDetector,
        d4: DuplicatePunchDetector,
        d5: AssignmentConflictDetector,
        d6: WrongSiteDetector,
        d7: HolidayConflictDetector,
        d8: LateSubmissionDetector,
        d9: UnauthorizedCorrectionDetector,
        d10: OvertimeThresholdDetector
      ) => [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10],
      inject: [
        ShiftViolationDetector,
        MissingAttendanceDetector,
        MissingCheckoutDetector,
        DuplicatePunchDetector,
        AssignmentConflictDetector,
        WrongSiteDetector,
        HolidayConflictDetector,
        LateSubmissionDetector,
        UnauthorizedCorrectionDetector,
        OvertimeThresholdDetector
      ]
    },
    CreateDailySiteMusterCommandHandler,
    SubmitAttendanceHandler,
    ValidateAttendanceHandler,
    StartReviewHandler,
    CompleteReviewHandler,
    LockAttendanceHandler,
    RequestCorrectionHandler,
    ApproveCorrectionHandler,
    RejectCorrectionHandler,
    ReopenAttendanceHandler,
    GenerateAttendanceSummaryHandler,
    ...repositories,
  ],
  exports: [
    AttendanceQueryService,
    AttendanceCalculationService,
    PlatformAttendanceSDK,
    AttendanceLifecycleService,
    AttendanceReviewService,
    AttendanceHealthService,
    OperationalExceptionOrchestrator,
    CreateDailySiteMusterCommandHandler,
    SubmitAttendanceHandler,
    ValidateAttendanceHandler,
    StartReviewHandler,
    CompleteReviewHandler,
    LockAttendanceHandler,
    RequestCorrectionHandler,
    ApproveCorrectionHandler,
    RejectCorrectionHandler,
    ReopenAttendanceHandler,
    ...repositories,
  ],
})
export class AttendanceModule {}
