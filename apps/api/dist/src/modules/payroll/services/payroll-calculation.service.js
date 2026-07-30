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
var PayrollCalculationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollCalculationService = void 0;
const common_1 = require("@nestjs/common");
const payroll_formula_engine_1 = require("./payroll-formula.engine");
const payroll_calculation_repository_1 = require("../repositories/payroll-calculation.repository");
const calculation_step_repository_1 = require("../repositories/calculation-step.repository");
const payroll_snapshot_repository_1 = require("../repositories/payroll-snapshot.repository");
const payslip_service_1 = require("./payslip.service");
const event_bus_service_1 = require("../../../core/events/event-bus.service");
const payroll_events_1 = require("../domain/events/payroll.events");
const uuid_1 = require("uuid");
let PayrollCalculationService = PayrollCalculationService_1 = class PayrollCalculationService {
    constructor(snapshotRepo, calcRepo, stepRepo, formulaEngine, payslipService, eventBus) {
        this.snapshotRepo = snapshotRepo;
        this.calcRepo = calcRepo;
        this.stepRepo = stepRepo;
        this.formulaEngine = formulaEngine;
        this.payslipService = payslipService;
        this.eventBus = eventBus;
        this.logger = new common_1.Logger(PayrollCalculationService_1.name);
    }
    async calculateEmployeePayroll(ctx, runId, employeeId, currencyId, snapshotId, tx) {
        this.logger.log(`Calculating payroll for employee ${employeeId} via snapshot ${snapshotId}`);
        const snapshot = await this.snapshotRepo.findById(snapshotId, tx);
        if (!snapshot)
            throw new common_1.BadRequestException('Payroll snapshot missing');
        const data = snapshot.snapshotData;
        await tx.payCalculationStep.deleteMany({
            where: { calculation: { payrollRunId: runId, employeeId } }
        });
        await tx.payPayrollCalculation.deleteMany({
            where: { payrollRunId: runId, employeeId }
        });
        const calc = await this.calcRepo.save({
            id: (0, uuid_1.v4)(),
            tenantId: ctx.tenantId,
            payrollRunId: runId,
            employeeId,
            grossPay: 0,
            netPay: 0,
            totalDeductions: 0,
            currencyId
        }, tx);
        const ctc = data.salaryAssignment.annualCTC / 12;
        const attendanceSummary = data.attendanceSummary || {};
        const lopDays = attendanceSummary.totalLopDays || 0;
        const perDaySalary = ctc / 30;
        const lopDeduction = perDaySalary * lopDays;
        let grossPay = 0;
        let totalDeductions = 0;
        let sequence = 1;
        const basicResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'BASIC', { ctc }, tx);
        await this.stepRepo.save({ id: (0, uuid_1.v4)(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'BASIC', calculatedValue: basicResult.value, formulaHash: basicResult.hash, executionOrder: sequence++ }, tx);
        grossPay += basicResult.value;
        const hraResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'HRA', { ctc }, tx);
        await this.stepRepo.save({ id: (0, uuid_1.v4)(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'HRA', calculatedValue: hraResult.value, formulaHash: hraResult.hash, executionOrder: sequence++ }, tx);
        grossPay += hraResult.value;
        await this.stepRepo.save({ id: (0, uuid_1.v4)(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'LOP', calculatedValue: -lopDeduction, formulaHash: 'LOP_RULE_V1', executionOrder: sequence++ }, tx);
        grossPay -= lopDeduction;
        const pfResult = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'PF', { ctc }, tx);
        await this.stepRepo.save({ id: (0, uuid_1.v4)(), tenantId: ctx.tenantId, calculationId: calc.id, componentId: 'PF', calculatedValue: -pfResult.value, formulaHash: pfResult.hash, executionOrder: sequence++ }, tx);
        totalDeductions += pfResult.value + lopDeduction;
        const netPay = grossPay - pfResult.value;
        await this.calcRepo.save({
            id: calc.id,
            grossPay,
            netPay,
            totalDeductions
        }, tx);
        const payslipId = await this.payslipService.generatePayslip(ctx, runId, employeeId, calc.id, snapshotId, tx);
        this.eventBus.publish(new payroll_events_1.PayslipGeneratedEvent(payslipId, runId, employeeId));
        return calc.id;
    }
};
exports.PayrollCalculationService = PayrollCalculationService;
exports.PayrollCalculationService = PayrollCalculationService = PayrollCalculationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_snapshot_repository_1.PayPayrollSnapshotRepository,
        payroll_calculation_repository_1.PayPayrollCalculationRepository,
        calculation_step_repository_1.PayCalculationStepRepository,
        payroll_formula_engine_1.PayrollFormulaEngine,
        payslip_service_1.PayslipService,
        event_bus_service_1.EventBusService])
], PayrollCalculationService);
//# sourceMappingURL=payroll-calculation.service.js.map