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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayPayrollCalculationRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PayPayrollCalculationRepository = class PayPayrollCalculationRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, tx) {
        const client = tx || this.prisma;
        return client.payPayrollCalculation.findUnique({ where: { id } });
    }
    async save(data, tx) {
        const client = tx || this.prisma;
        if (data.id) {
            return client.payPayrollCalculation.update({ where: { id: data.id }, data });
        }
        return client.payPayrollCalculation.create({ data });
    }
    async getEmployeePayrollSummary(tenantId, employeeId, runId) {
        return this.prisma.payPayrollCalculation.findFirst({
            where: { payrollRunId: runId, employeeId }
        });
    }
    async getEmployeePayrollHistory(tenantId, employeeId, limit, offset) {
        return this.prisma.payPayrollCalculation.findMany({
            where: { employeeId },
            include: {
                payrollRun: true
            },
            take: limit,
            skip: offset
        });
    }
    async getCalculationBreakdown(tenantId, calculationId) {
        return this.prisma.payCalculationStep.findMany({
            where: { calculationId }
        });
    }
};
exports.PayPayrollCalculationRepository = PayPayrollCalculationRepository;
exports.PayPayrollCalculationRepository = PayPayrollCalculationRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayPayrollCalculationRepository);
//# sourceMappingURL=payroll-calculation.repository.js.map