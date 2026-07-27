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
var PayrollRunService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRunService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const payroll_calculation_service_1 = require("./payroll-calculation.service");
let PayrollRunService = PayrollRunService_1 = class PayrollRunService {
    constructor(prisma, calcService) {
        this.prisma = prisma;
        this.calcService = calcService;
        this.logger = new common_1.Logger(PayrollRunService_1.name);
    }
    async captureSnapshotAndCalculate(ctx, runId, currencyId) {
        this.logger.log(`Running calculation phase for run ${runId}`);
        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Calculating' }
        });
        const assignments = await this.prisma.payEmployeeSalaryAssignment.findMany({
            where: { tenantId: ctx.tenantId }
        });
        for (const assign of assignments) {
            let snapshot = await this.prisma.payPayrollSnapshot.findFirst({
                where: { payrollRunId: runId, employeeId: assign.employeeId }
            });
            if (!snapshot) {
                snapshot = await this.prisma.payPayrollSnapshot.create({
                    data: {
                        tenantId: ctx.tenantId,
                        payrollRunId: runId,
                        employeeId: assign.employeeId,
                        snapshotData: {
                            salaryAssignment: assign,
                            attendanceSummary: { lopDays: 2 },
                            rulesVersion: 1
                        }
                    }
                });
            }
            else {
                this.logger.warn(`Using existing snapshot for deterministic run (Employee ${assign.employeeId})`);
            }
            await this.calcService.calculateEmployeePayroll(ctx, runId, assign.employeeId, currencyId);
        }
        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Approved' }
        });
        this.logger.log('Published event: PayrollCalculationCompleted');
    }
    async lockPayroll(ctx, runId) {
        this.logger.log(`Locking payroll run ${runId}`);
        await this.prisma.payPayrollRun.update({
            where: { id: runId },
            data: { status: 'Locked' }
        });
        this.logger.log('Published event: PayrollLocked');
    }
};
exports.PayrollRunService = PayrollRunService;
exports.PayrollRunService = PayrollRunService = PayrollRunService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        payroll_calculation_service_1.PayrollCalculationService])
], PayrollRunService);
//# sourceMappingURL=payroll-run.service.js.map