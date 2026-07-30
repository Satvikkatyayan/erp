"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../common/prisma/prisma.module");
const payroll_query_service_1 = require("./services/payroll-query.service");
const payroll_formula_engine_1 = require("./services/payroll-formula.engine");
const payroll_calculation_service_1 = require("./services/payroll-calculation.service");
const payslip_service_1 = require("./services/payslip.service");
const journal_service_1 = require("./services/journal.service");
const payroll_state_machine_service_1 = require("./services/payroll-state-machine.service");
const payroll_snapshot_service_1 = require("./services/payroll-snapshot.service");
const payroll_execution_service_1 = require("./services/payroll-execution.service");
const payroll_review_service_1 = require("./services/payroll-review.service");
const payslip_assembler_service_1 = require("./services/payslip-assembler.service");
const platform_payroll_sdk_1 = require("./sdk/platform-payroll.sdk");
const payroll_policy_repository_1 = require("./repositories/payroll-policy.repository");
const payroll_period_repository_1 = require("./repositories/payroll-period.repository");
const salary_component_repository_1 = require("./repositories/salary-component.repository");
const salary_structure_repository_1 = require("./repositories/salary-structure.repository");
const salary_assignment_repository_1 = require("./repositories/salary-assignment.repository");
const payroll_run_repository_1 = require("./repositories/payroll-run.repository");
const payroll_snapshot_repository_1 = require("./repositories/payroll-snapshot.repository");
const payroll_calculation_repository_1 = require("./repositories/payroll-calculation.repository");
const calculation_step_repository_1 = require("./repositories/calculation-step.repository");
const payslip_repository_1 = require("./repositories/payslip.repository");
const payroll_review_repository_1 = require("./repositories/payroll-review.repository");
const payroll_timeline_repository_1 = require("./repositories/payroll-timeline.repository");
const payroll_workflow_repository_1 = require("./repositories/payroll-workflow.repository");
const payroll_run_workflow_snapshot_repository_1 = require("./repositories/payroll-run-workflow-snapshot.repository");
const attendance_module_1 = require("../attendance/attendance.module");
const events_module_1 = require("../../core/events/events.module");
const journal_repository_1 = require("./repositories/journal.repository");
const payment_batch_repository_1 = require("./repositories/payment-batch.repository");
const arrear_repository_1 = require("./repositories/arrear.repository");
const payroll_adjustment_repository_1 = require("./repositories/payroll-adjustment.repository");
const payroll_journal_assembler_service_1 = require("./services/payroll-journal-assembler.service");
const payment_batch_service_1 = require("./services/payment-batch.service");
const repositories = [
    payroll_policy_repository_1.PayPayrollPolicyRepository,
    payroll_period_repository_1.PayPayrollPeriodRepository,
    salary_component_repository_1.PaySalaryComponentRepository,
    salary_structure_repository_1.PaySalaryStructureRepository,
    salary_assignment_repository_1.PaySalaryAssignmentRepository,
    payroll_run_repository_1.PayPayrollRunRepository,
    payroll_snapshot_repository_1.PayPayrollSnapshotRepository,
    payroll_calculation_repository_1.PayPayrollCalculationRepository,
    calculation_step_repository_1.PayCalculationStepRepository,
    payslip_repository_1.PayPayslipRepository,
    payroll_review_repository_1.PayPayrollReviewRepository,
    payroll_timeline_repository_1.PayPayrollTimelineRepository,
    payroll_workflow_repository_1.PayPayrollWorkflowRepository,
    payroll_run_workflow_snapshot_repository_1.PayPayrollRunWorkflowSnapshotRepository,
    journal_repository_1.PayJournalRepository,
    payment_batch_repository_1.PayPaymentBatchRepository,
    arrear_repository_1.PayArrearRepository,
    payroll_adjustment_repository_1.PayPayrollAdjustmentRepository
];
const services = [
    payroll_query_service_1.PayrollQueryService,
    payroll_formula_engine_1.PayrollFormulaEngine,
    payroll_calculation_service_1.PayrollCalculationService,
    payslip_service_1.PayslipService,
    journal_service_1.JournalService,
    payroll_state_machine_service_1.PayrollStateMachineService,
    payroll_snapshot_service_1.PayrollSnapshotService,
    payroll_execution_service_1.PayrollExecutionService,
    payroll_review_service_1.PayrollReviewService,
    payslip_assembler_service_1.PayslipAssembler,
    platform_payroll_sdk_1.PlatformPayrollSDK,
    payroll_journal_assembler_service_1.PayrollJournalAssembler,
    payment_batch_service_1.PaymentBatchService
];
const create_payroll_run_handler_1 = require("./commands/handlers/create-payroll-run.handler");
const start_payroll_collection_handler_1 = require("./commands/handlers/start-payroll-collection.handler");
const generate_payroll_snapshots_handler_1 = require("./commands/handlers/generate-payroll-snapshots.handler");
const calculate_payroll_handler_1 = require("./commands/handlers/calculate-payroll.handler");
const approve_payroll_handler_1 = require("./commands/handlers/approve-payroll.handler");
const lock_payroll_handler_1 = require("./commands/handlers/lock-payroll.handler");
const process_payroll_handler_1 = require("./commands/handlers/process-payroll.handler");
const cancel_payroll_handler_1 = require("./commands/handlers/cancel-payroll.handler");
const reopen_payroll_handler_1 = require("./commands/handlers/reopen-payroll.handler");
const regenerate_employee_payroll_handler_1 = require("./commands/handlers/regenerate-employee-payroll.handler");
const submit_payroll_review_approval_handler_1 = require("./commands/handlers/submit-payroll-review-approval.handler");
const submit_payroll_review_rejection_handler_1 = require("./commands/handlers/submit-payroll-review-rejection.handler");
const handlers = [
    create_payroll_run_handler_1.CreatePayrollRunHandler,
    start_payroll_collection_handler_1.StartPayrollCollectionHandler,
    generate_payroll_snapshots_handler_1.GeneratePayrollSnapshotsHandler,
    calculate_payroll_handler_1.CalculatePayrollHandler,
    approve_payroll_handler_1.ApprovePayrollHandler,
    lock_payroll_handler_1.LockPayrollHandler,
    process_payroll_handler_1.ProcessPayrollHandler,
    cancel_payroll_handler_1.CancelPayrollHandler,
    reopen_payroll_handler_1.ReopenPayrollHandler,
    regenerate_employee_payroll_handler_1.RegenerateEmployeePayrollHandler,
    submit_payroll_review_approval_handler_1.SubmitPayrollReviewApprovalHandler,
    submit_payroll_review_rejection_handler_1.SubmitPayrollReviewRejectionHandler
];
const payroll_run_controller_1 = require("./controllers/payroll-run.controller");
const payroll_review_controller_1 = require("./controllers/payroll-review.controller");
const payroll_query_controller_1 = require("./controllers/payroll-query.controller");
const payroll_mapper_1 = require("./dtos/mapping/payroll.mapper");
const controllers = [
    payroll_run_controller_1.PayrollRunController,
    payroll_review_controller_1.PayrollReviewController,
    payroll_query_controller_1.PayrollQueryController
];
let PayrollModule = class PayrollModule {
};
exports.PayrollModule = PayrollModule;
exports.PayrollModule = PayrollModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            attendance_module_1.AttendanceModule,
            events_module_1.EventsModule
        ],
        controllers: [
            ...controllers
        ],
        providers: [
            payroll_mapper_1.PayrollMapper,
            ...repositories,
            ...services,
            ...handlers
        ],
        exports: [
            payroll_mapper_1.PayrollMapper,
            ...repositories,
            ...services
        ]
    })
], PayrollModule);
//# sourceMappingURL=payroll.module.js.map