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
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const payroll_formula_engine_1 = require("./payroll-formula.engine");
const uuid_1 = require("uuid");
let PayrollCalculationService = PayrollCalculationService_1 = class PayrollCalculationService {
    constructor(prisma, formulaEngine) {
        this.prisma = prisma;
        this.formulaEngine = formulaEngine;
        this.logger = new common_1.Logger(PayrollCalculationService_1.name);
    }
    async calculateEmployeePayroll(ctx, runId, employeeId, currencyId) {
        this.logger.log(`Calculating payroll for employee ${employeeId} in run ${runId}`);
        const snapshot = await this.prisma.payPayrollSnapshot.findFirst({
            where: { payrollRunId: runId, employeeId }
        });
        if (!snapshot)
            throw new common_1.BadRequestException('Payroll snapshot missing for employee');
        const data = snapshot.snapshotData;
        const ctc = data.salaryAssignment.annualCTC / 12;
        const lopDays = data.attendanceSummary.lopDays || 0;
        const perDaySalary = ctc / 30;
        const lopDeduction = perDaySalary * lopDays;
        const basic = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'BASIC', { ctc });
        const hra = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'HRA', { ctc });
        const pf = await this.formulaEngine.evaluateComponent(ctx, employeeId, 'PF', { ctc });
        const grossPay = basic + hra - lopDeduction;
        const netPay = grossPay - pf;
        await this.prisma.payPayrollCalculation.deleteMany({
            where: { payrollRunId: runId, employeeId }
        });
        const calc = await this.prisma.payPayrollCalculation.create({
            data: {
                tenantId: ctx.tenantId,
                payrollRunId: runId,
                employeeId,
                grossPay,
                netPay,
                totalDeductions: pf + lopDeduction,
                currencyId
            }
        });
        const comp1 = (0, uuid_1.v4)();
        const comp2 = (0, uuid_1.v4)();
        const comp3 = (0, uuid_1.v4)();
        const comp4 = (0, uuid_1.v4)();
        await this.prisma.payCalculationStep.createMany({
            data: [
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: comp1, calculatedValue: basic, executionOrder: 1 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: comp2, calculatedValue: hra, executionOrder: 2 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: comp3, calculatedValue: -lopDeduction, executionOrder: 3 },
                { tenantId: ctx.tenantId, calculationId: calc.id, componentId: comp4, calculatedValue: -pf, executionOrder: 4 }
            ]
        });
        return calc.id;
    }
};
exports.PayrollCalculationService = PayrollCalculationService;
exports.PayrollCalculationService = PayrollCalculationService = PayrollCalculationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payroll_formula_engine_1.PayrollFormulaEngine])
], PayrollCalculationService);
//# sourceMappingURL=payroll-calculation.service.js.map