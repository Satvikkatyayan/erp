"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PayrollExecutionService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const payroll_state_machine_service_1 = require("./payroll-state-machine.service");
const payroll_snapshot_service_1 = require("./payroll-snapshot.service");
const payroll_calculation_service_1 = require("./payroll-calculation.service");
const platform_attendance_sdk_1 = require("../../attendance/sdk/platform-attendance.sdk");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const payroll_review_service_1 = require("./payroll-review.service");
const uuid_1 = require("uuid");
const payroll_review_events_1 = require("../events/payroll-review.events");
const payroll_events_1 = require("../domain/events/payroll.events");
let PayrollExecutionService = PayrollExecutionService_1 = class PayrollExecutionService {
    constructor(prisma, stateMachine, snapshotService, calculationService, attendanceSdk, eventBus, reviewService) {
        this.prisma = prisma;
        this.stateMachine = stateMachine;
        this.snapshotService = snapshotService;
        this.calculationService = calculationService;
        this.attendanceSdk = attendanceSdk;
        this.eventBus = eventBus;
        this.reviewService = reviewService;
        this.logger = new common_1.Logger(PayrollExecutionService_1.name);
    }
    async createPayrollRun(ctx, periodId, runType) {
        const runId = (0, uuid_1.v4)();
        await this.prisma.$transaction(async (tx) => {
            await tx.payPayrollRun.create({
                data: {
                    id: runId,
                    tenantId: ctx.tenantId,
                    periodId,
                    runType,
                    status: payroll_state_machine_service_1.PayrollRunStatus.DRAFT
                }
            });
        });
        this.eventBus.publish(new payroll_events_1.PayrollRunCreatedEvent(runId, ctx.tenantId));
        return runId;
    }
    async startPayrollCollection(ctx, runId) {
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.COLLECTING, tx);
        });
        this.eventBus.publish(new payroll_events_1.PayrollCollectionStartedEvent(runId, ctx.tenantId));
    }
    async generatePayrollSnapshots(ctx, runId) {
        const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
        if (!run)
            throw new common_1.BadRequestException('Run not found');
        const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
            where: { tenantId: ctx.tenantId }
        });
        const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });
        await this.prisma.$transaction(async (tx) => {
            for (const assign of assignments) {
                const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(assign.employeeId, run.periodId);
                if (!attendanceSummary) {
                    throw new common_1.BadRequestException(`Missing Attendance Summary for employee ${assign.employeeId}`);
                }
                await this.snapshotService.generateSnapshot(ctx.tenantId, runId, assign.employeeId, assign, attendanceSummary, 'v1', 'v1', periodObj, tx);
            }
        });
        this.eventBus.publish(new payroll_events_1.PayrollSnapshotsGeneratedEvent(runId, ctx.tenantId));
    }
    async executePayrollRun(ctx, runId, currencyId) {
        this.logger.log(`Starting payroll execution for run ${runId}`);
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.COLLECTING, tx);
        });
        this.eventBus.publish(new payroll_events_1.PayrollCollectionStartedEvent(runId, ctx.tenantId));
        const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
        if (!run)
            throw new common_1.BadRequestException('Run not found');
        const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
            where: { tenantId: ctx.tenantId }
        });
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.CALCULATING, tx);
        });
        for (const assign of assignments) {
            this.eventBus.publish(new payroll_events_1.PayrollCalculationCreatedEvent(null, runId, assign.employeeId));
            try {
                await this.prisma.$transaction(async (tx) => {
                    const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(assign.employeeId, run.periodId);
                    if (!attendanceSummary) {
                        throw new common_1.BadRequestException(`Missing Attendance Summary for employee ${assign.employeeId}`);
                    }
                    const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });
                    const snapshotId = await this.snapshotService.generateSnapshot(ctx.tenantId, runId, assign.employeeId, assign, attendanceSummary, 'v1', 'v1', periodObj, tx);
                    this.eventBus.publish(new payroll_events_1.PayrollSnapshotCreatedEvent(snapshotId, runId, assign.employeeId));
                    await this.calculationService.calculateEmployeePayroll(ctx, runId, assign.employeeId, currencyId, snapshotId, tx);
                });
            }
            catch (error) {
                this.logger.error(`Employee ${assign.employeeId} failed: ${error.message}`);
            }
        }
        await this.prisma.$transaction(async (tx) => {
            await this.reviewService.initializeWorkflow(ctx, runId, 1, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Calculations Completed', 'Starting Review Workflow', 'CALCULATING', 'CALCULATING', 1, tx);
        });
        this.eventBus.publish(new payroll_events_1.PayrollCalculationCompletedEvent(runId));
        this.eventBus.publish(new payroll_review_events_1.PayrollReviewStartedEvent(ctx, runId));
    }
    async submitReviewApproval(ctx, runId, reviewId, remarks) {
        let roleCode = '';
        let roleDisplayName = '';
        let stepNumber = 0;
        await this.prisma.$transaction(async (tx) => {
            const review = await this.reviewService.approveStep(ctx, reviewId, remarks, tx);
            roleCode = review.roleCode;
            roleDisplayName = review.roleDisplayName;
            stepNumber = review.stepNumber;
            await this.reviewService.recordTimeline(ctx, runId, `${roleDisplayName} Approved`, remarks, undefined, undefined, 1, tx);
        });
    }
    async submitReviewRejection(ctx, runId, reviewId, remarks) {
        let roleCode = '';
        let roleDisplayName = '';
        let stepNumber = 0;
        await this.prisma.$transaction(async (tx) => {
            const review = await this.reviewService.rejectStep(ctx, reviewId, remarks, tx);
            roleCode = review.roleCode;
            roleDisplayName = review.roleDisplayName;
            stepNumber = review.stepNumber;
            await this.reviewService.recordTimeline(ctx, runId, `${roleDisplayName} Rejected`, remarks, undefined, undefined, 1, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollRejectedEvent(ctx, runId, undefined, undefined, stepNumber, roleCode, roleDisplayName, 'REJECTED'));
    }
    async approvePayrollRun(ctx, runId) {
        await this.prisma.$transaction(async (tx) => {
            const isEligible = await this.reviewService.isApprovalComplete(runId, tx);
            if (!isEligible)
                throw new common_1.BadRequestException('Not all mandatory reviewers have approved');
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.APPROVED, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Payroll Approved', 'All reviewers approved', undefined, 'APPROVED', 1, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollApprovedEvent(ctx, runId));
    }
    async lockPayroll(ctx, runId) {
        this.logger.log(`Locking payroll run ${runId}`);
        await this.prisma.$transaction(async (tx) => {
            const isEligible = await this.reviewService.isEligibleForLock(runId, tx);
            if (!isEligible)
                throw new common_1.BadRequestException('Cannot lock unapproved payroll');
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.LOCKED, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Payroll Locked', 'Finalizing run', 'APPROVED', 'LOCKED', 1, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollLockedEvent(ctx, runId));
    }
    async processPayrollRun(ctx, runId) {
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.PROCESSED, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Payroll Processed', 'Initiating disbursement', 'LOCKED', 'PROCESSED', 1, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollProcessedEvent(ctx, runId));
    }
    async cancelPayrollRun(ctx, runId) {
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.CANCELLED, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Payroll Cancelled', 'User aborted', undefined, 'CANCELLED', 1, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollCancelledEvent(ctx, runId));
    }
    async reopenPayrollRun(ctx, runId) {
        await this.prisma.$transaction(async (tx) => {
            await this.stateMachine.transition(runId, payroll_state_machine_service_1.PayrollRunStatus.DRAFT, tx);
            await this.reviewService.initializeWorkflow(ctx, runId, 2, tx);
            await this.reviewService.recordTimeline(ctx, runId, 'Payroll Reopened', 'Corrections needed', undefined, 'DRAFT', 2, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.PayrollReopenedEvent(ctx, runId));
    }
    async regenerateEmployeePayroll(ctx, runId, employeeId, currencyId) {
        const run = await this.prisma.payPayrollRun.findUnique({ where: { id: runId } });
        if (!run)
            throw new common_1.BadRequestException('Run not found');
        const assign = await this.prisma.payEmployeeSalaryAssignment.findFirst({
            where: { employeeId, tenantId: ctx.tenantId }
        });
        if (!assign)
            throw new common_1.BadRequestException('Salary Assignment missing');
        const periodObj = await this.prisma.payPayrollPeriod.findUnique({ where: { id: run.periodId } });
        await this.prisma.$transaction(async (tx) => {
            const attendanceSummary = await this.attendanceSdk.getAttendanceSummary(employeeId, run.periodId);
            if (!attendanceSummary) {
                throw new common_1.BadRequestException(`Missing Attendance Summary for employee ${employeeId}`);
            }
            const snapshotId = await this.snapshotService.generateSnapshot(ctx.tenantId, runId, employeeId, assign, attendanceSummary, 'v1', 'v1', periodObj, tx);
            await this.calculationService.calculateEmployeePayroll(ctx, runId, employeeId, currencyId, snapshotId, tx);
        });
        this.eventBus.publish(new payroll_review_events_1.EmployeePayrollRegeneratedEvent(ctx, runId, employeeId));
    }
};
exports.PayrollExecutionService = PayrollExecutionService;
exports.PayrollExecutionService = PayrollExecutionService = PayrollExecutionService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payroll_state_machine_service_1.PayrollStateMachineService,
        payroll_snapshot_service_1.PayrollSnapshotService,
        payroll_calculation_service_1.PayrollCalculationService,
        platform_attendance_sdk_1.PlatformAttendanceSDK,
        event_bus_service_1.EventBusService,
        payroll_review_service_1.PayrollReviewService])
], PayrollExecutionService);
//# sourceMappingURL=payroll-execution.service.js.map