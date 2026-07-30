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
exports.PayPayrollRunRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PayPayrollRunRepository = class PayPayrollRunRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, tx) {
        const client = tx || this.prisma;
        return client.payPayrollRun.findUnique({ where: { id } });
    }
    async save(data, tx) {
        const client = tx || this.prisma;
        if (data.id) {
            return client.payPayrollRun.update({ where: { id: data.id }, data });
        }
        return client.payPayrollRun.create({ data });
    }
    async getDashboardStats(tenantId) {
        const runs = await this.prisma.payPayrollRun.findMany({ where: { tenantId } });
        const draftRuns = runs.filter(r => r.status === 'Draft').length;
        const approvedRuns = runs.filter(r => r.status === 'APPROVED').length;
        const lockedRuns = runs.filter(r => r.status === 'LOCKED').length;
        const processedRuns = runs.filter(r => r.status === 'PROCESSED').length;
        return {
            totalPayrollRuns: runs.length,
            draftRuns,
            approvedRuns,
            lockedRuns,
            processedRuns,
            employeesProcessed: 0,
            pendingEmployees: 0,
            currentPayrollPeriod: 'Current',
            totalGrossPayroll: 0,
            totalNetPayroll: 0
        };
    }
    async getRunSummary(tenantId, runId) {
        return this.prisma.payPayrollRun.findFirst({
            where: { id: runId, tenantId },
            include: {
                calculations: true,
                snapshots: true
            }
        });
    }
    async getRunDetails(tenantId, runId) {
        return this.prisma.payPayrollRun.findFirst({
            where: { id: runId, tenantId },
            include: {
                calculations: {
                    include: {
                        payslips: true
                    }
                },
                snapshots: true
            }
        });
    }
    async searchAndFilterRuns(tenantId, query, filters, limit, offset) {
        return this.prisma.payPayrollRun.findMany({
            where: {
                tenantId,
                ...filters
            },
            take: limit,
            skip: offset
        });
    }
    async getOrganizationalSummary(tenantId, type) {
        return [];
    }
};
exports.PayPayrollRunRepository = PayPayrollRunRepository;
exports.PayPayrollRunRepository = PayPayrollRunRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayPayrollRunRepository);
//# sourceMappingURL=payroll-run.repository.js.map