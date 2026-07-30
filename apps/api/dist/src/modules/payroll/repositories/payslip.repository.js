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
exports.PayPayslipRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
let PayPayslipRepository = class PayPayslipRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id, tx) {
        const client = tx || this.prisma;
        return client.payPayslip.findUnique({ where: { id } });
    }
    async save(data, tx) {
        const client = tx || this.prisma;
        if (data.id) {
            return client.payPayslip.update({ where: { id: data.id }, data });
        }
        return client.payPayslip.create({ data });
    }
    async createVersion(calculationId, tenantId, payslipData, documentUrl = null, tx) {
        const client = tx || this.prisma;
        const latest = await client.payPayslip.findFirst({
            where: { calculationId, tenantId },
            orderBy: { versionNumber: 'desc' }
        });
        if (latest && latest.status === 'Draft') {
            await client.payPayslip.update({
                where: { id: latest.id },
                data: { status: 'Superseded' }
            });
        }
        else if (latest && latest.status === 'Published') {
            await client.payPayslip.update({
                where: { id: latest.id },
                data: { status: 'Superseded' }
            });
        }
        const versionNumber = latest ? latest.versionNumber + 1 : 1;
        payslipData.versionNumber = versionNumber;
        return client.payPayslip.create({
            data: {
                tenantId,
                calculationId,
                versionNumber,
                payslipData,
                documentUrl,
                status: 'Draft'
            }
        });
    }
    async getLatest(calculationId, tenantId) {
        return this.prisma.payPayslip.findFirst({
            where: { calculationId, tenantId },
            orderBy: { versionNumber: 'desc' }
        });
    }
    async getVersion(calculationId, tenantId, versionNumber) {
        return this.prisma.payPayslip.findFirst({
            where: { calculationId, tenantId, versionNumber }
        });
    }
    async getHistory(calculationId, tenantId) {
        return this.prisma.payPayslip.findMany({
            where: { calculationId, tenantId },
            orderBy: { versionNumber: 'desc' }
        });
    }
    async exists(calculationId, tenantId) {
        const count = await this.prisma.payPayslip.count({
            where: { calculationId, tenantId }
        });
        return count > 0;
    }
    async getEmployeePayslipHistory(tenantId, employeeId, limit, offset) {
        return this.prisma.payPayslip.findMany({
            where: {
                tenantId,
                calculation: { employeeId }
            },
            take: limit,
            skip: offset,
            orderBy: { id: 'desc' }
        });
    }
    async getPayslips(ctx) {
        return this.prisma.payPayslip.findMany({
            where: {
                tenantId: ctx.tenantId,
                calculation: { employeeId: ctx.userId }
            },
            orderBy: { id: 'desc' }
        });
    }
    async getLatestPayslip(ctx) {
        const list = await this.getPayslips(ctx);
        return list.length > 0 ? list[0] : null;
    }
};
exports.PayPayslipRepository = PayPayslipRepository;
exports.PayPayslipRepository = PayPayslipRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayPayslipRepository);
//# sourceMappingURL=payslip.repository.js.map