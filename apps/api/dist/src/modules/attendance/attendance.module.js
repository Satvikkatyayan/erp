"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AttendanceModule = void 0;
const common_1 = require("@nestjs/common");
const attendance_query_service_1 = require("./services/attendance-query.service");
const attendance_lifecycle_service_1 = require("./services/attendance-lifecycle.service");
const attendance_calculation_service_1 = require("./services/attendance-calculation.service");
const platform_attendance_sdk_1 = require("./sdk/platform-attendance.sdk");
const attendance_timeline_service_1 = require("./services/attendance-timeline.service");
const shift_service_1 = require("./services/shift.service");
const attendance_snapshot_service_1 = require("./services/attendance-snapshot.service");
const attendance_initialization_service_1 = require("./services/attendance-initialization.service");
const attendance_state_machine_service_1 = require("./services/attendance-state-machine.service");
const attendance_review_service_1 = require("./services/attendance-review.service");
const attendance_health_service_1 = require("./services/attendance-health.service");
const operational_exception_orchestrator_1 = require("./services/exceptions/operational-exception.orchestrator");
const shift_violation_detector_1 = require("./services/exceptions/detectors/shift-violation.detector");
const missing_attendance_detector_1 = require("./services/exceptions/detectors/missing-attendance.detector");
const missing_checkout_detector_1 = require("./services/exceptions/detectors/missing-checkout.detector");
const duplicate_punch_detector_1 = require("./services/exceptions/detectors/duplicate-punch.detector");
const assignment_conflict_detector_1 = require("./services/exceptions/detectors/assignment-conflict.detector");
const wrong_site_detector_1 = require("./services/exceptions/detectors/wrong-site.detector");
const holiday_conflict_detector_1 = require("./services/exceptions/detectors/holiday-conflict.detector");
const late_submission_detector_1 = require("./services/exceptions/detectors/late-submission.detector");
const unauthorized_correction_detector_1 = require("./services/exceptions/detectors/unauthorized-correction.detector");
const overtime_threshold_detector_1 = require("./services/exceptions/detectors/overtime-threshold.detector");
const create_daily_site_muster_command_1 = require("./commands/create-daily-site-muster.command");
const submit_attendance_handler_1 = require("./commands/handlers/submit-attendance.handler");
const validate_attendance_handler_1 = require("./commands/handlers/validate-attendance.handler");
const start_review_handler_1 = require("./commands/handlers/start-review.handler");
const complete_review_handler_1 = require("./commands/handlers/complete-review.handler");
const lock_attendance_handler_1 = require("./commands/handlers/lock-attendance.handler");
const request_correction_handler_1 = require("./commands/handlers/request-correction.handler");
const approve_correction_handler_1 = require("./commands/handlers/approve-correction.handler");
const reject_correction_handler_1 = require("./commands/handlers/reject-correction.handler");
const reopen_attendance_handler_1 = require("./commands/handlers/reopen-attendance.handler");
const generate_attendance_summary_handler_1 = require("./commands/handlers/generate-attendance-summary.handler");
const events_module_1 = require("../../core/events/events.module");
const daily_site_muster_repository_1 = require("./repositories/daily-site-muster.repository");
const muster_snapshot_repository_1 = require("./repositories/muster-snapshot.repository");
const attendance_day_repository_1 = require("./repositories/attendance-day.repository");
const attendance_session_repository_1 = require("./repositories/attendance-session.repository");
const attendance_punch_repository_1 = require("./repositories/attendance-punch.repository");
const attendance_review_repository_1 = require("./repositories/attendance-review.repository");
const muster_timeline_repository_1 = require("./repositories/muster-timeline.repository");
const employee_timeline_repository_1 = require("./repositories/employee-timeline.repository");
const attendance_summary_repository_1 = require("./repositories/attendance-summary.repository");
const repositories = [
    daily_site_muster_repository_1.DailySiteMusterRepository,
    muster_snapshot_repository_1.MusterSnapshotRepository,
    attendance_day_repository_1.AttendanceDayRepository,
    attendance_session_repository_1.AttendanceSessionRepository,
    attendance_punch_repository_1.AttendancePunchRepository,
    attendance_review_repository_1.AttendanceReviewRepository,
    muster_timeline_repository_1.MusterTimelineRepository,
    employee_timeline_repository_1.EmployeeTimelineRepository,
    attendance_summary_repository_1.AttendanceSummaryRepository,
];
let AttendanceModule = class AttendanceModule {
};
exports.AttendanceModule = AttendanceModule;
exports.AttendanceModule = AttendanceModule = __decorate([
    (0, common_1.Module)({
        imports: [events_module_1.EventsModule],
        providers: [
            attendance_query_service_1.AttendanceQueryService,
            attendance_lifecycle_service_1.AttendanceLifecycleService,
            attendance_calculation_service_1.AttendanceCalculationService,
            platform_attendance_sdk_1.PlatformAttendanceSDK,
            attendance_timeline_service_1.AttendanceTimelineService,
            shift_service_1.ShiftService,
            attendance_snapshot_service_1.AttendanceSnapshotService,
            attendance_initialization_service_1.AttendanceInitializationService,
            attendance_state_machine_service_1.AttendanceStateMachine,
            attendance_review_service_1.AttendanceReviewService,
            attendance_health_service_1.AttendanceHealthService,
            operational_exception_orchestrator_1.OperationalExceptionOrchestrator,
            shift_violation_detector_1.ShiftViolationDetector,
            missing_attendance_detector_1.MissingAttendanceDetector,
            missing_checkout_detector_1.MissingCheckoutDetector,
            duplicate_punch_detector_1.DuplicatePunchDetector,
            assignment_conflict_detector_1.AssignmentConflictDetector,
            wrong_site_detector_1.WrongSiteDetector,
            holiday_conflict_detector_1.HolidayConflictDetector,
            late_submission_detector_1.LateSubmissionDetector,
            unauthorized_correction_detector_1.UnauthorizedCorrectionDetector,
            overtime_threshold_detector_1.OvertimeThresholdDetector,
            {
                provide: 'EXCEPTION_DETECTORS',
                useFactory: (d1, d2, d3, d4, d5, d6, d7, d8, d9, d10) => [d1, d2, d3, d4, d5, d6, d7, d8, d9, d10],
                inject: [
                    shift_violation_detector_1.ShiftViolationDetector,
                    missing_attendance_detector_1.MissingAttendanceDetector,
                    missing_checkout_detector_1.MissingCheckoutDetector,
                    duplicate_punch_detector_1.DuplicatePunchDetector,
                    assignment_conflict_detector_1.AssignmentConflictDetector,
                    wrong_site_detector_1.WrongSiteDetector,
                    holiday_conflict_detector_1.HolidayConflictDetector,
                    late_submission_detector_1.LateSubmissionDetector,
                    unauthorized_correction_detector_1.UnauthorizedCorrectionDetector,
                    overtime_threshold_detector_1.OvertimeThresholdDetector
                ]
            },
            create_daily_site_muster_command_1.CreateDailySiteMusterCommandHandler,
            submit_attendance_handler_1.SubmitAttendanceHandler,
            validate_attendance_handler_1.ValidateAttendanceHandler,
            start_review_handler_1.StartReviewHandler,
            complete_review_handler_1.CompleteReviewHandler,
            lock_attendance_handler_1.LockAttendanceHandler,
            request_correction_handler_1.RequestCorrectionHandler,
            approve_correction_handler_1.ApproveCorrectionHandler,
            reject_correction_handler_1.RejectCorrectionHandler,
            reopen_attendance_handler_1.ReopenAttendanceHandler,
            generate_attendance_summary_handler_1.GenerateAttendanceSummaryHandler,
            ...repositories,
        ],
        exports: [
            attendance_query_service_1.AttendanceQueryService,
            attendance_calculation_service_1.AttendanceCalculationService,
            platform_attendance_sdk_1.PlatformAttendanceSDK,
            attendance_lifecycle_service_1.AttendanceLifecycleService,
            attendance_review_service_1.AttendanceReviewService,
            attendance_health_service_1.AttendanceHealthService,
            operational_exception_orchestrator_1.OperationalExceptionOrchestrator,
            create_daily_site_muster_command_1.CreateDailySiteMusterCommandHandler,
            submit_attendance_handler_1.SubmitAttendanceHandler,
            validate_attendance_handler_1.ValidateAttendanceHandler,
            start_review_handler_1.StartReviewHandler,
            complete_review_handler_1.CompleteReviewHandler,
            lock_attendance_handler_1.LockAttendanceHandler,
            request_correction_handler_1.RequestCorrectionHandler,
            approve_correction_handler_1.ApproveCorrectionHandler,
            reject_correction_handler_1.RejectCorrectionHandler,
            reopen_attendance_handler_1.ReopenAttendanceHandler,
            ...repositories,
        ],
    })
], AttendanceModule);
//# sourceMappingURL=attendance.module.js.map