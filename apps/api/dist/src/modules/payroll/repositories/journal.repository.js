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
exports.PayJournalRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let PayJournalRepository = class PayJournalRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createJournal(tenantId, payrollRunId, versionNumber, tx) {
        const client = tx || this.prisma;
        await client.payPayrollJournal.updateMany({
            where: { payrollRunId, tenantId, status: { in: ['Draft', 'Published'] } },
            data: { status: 'Superseded' }
        });
        return client.payPayrollJournal.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                payrollRunId,
                versionNumber,
                status: 'Draft'
            }
        });
    }
    async createEntries(entries, tx) {
        const client = tx || this.prisma;
        if (entries.length === 0)
            return;
        await client.payPayrollJournalEntry.createMany({
            data: entries
        });
    }
    async getJournal(tenantId, payrollRunId) {
        return this.prisma.payPayrollJournal.findFirst({
            where: { payrollRunId, tenantId },
            orderBy: { versionNumber: 'desc' },
            include: { entries: true }
        });
    }
    async getHistory(tenantId, payrollRunId) {
        return this.prisma.payPayrollJournal.findMany({
            where: { payrollRunId, tenantId },
            orderBy: { versionNumber: 'desc' }
        });
    }
    async getEntries(journalId) {
        return this.prisma.payPayrollJournalEntry.findMany({
            where: { journalId }
        });
    }
    async createVersion(tenantId, payrollRunId, tx) {
        const client = tx || this.prisma;
        const latest = await client.payPayrollJournal.findFirst({
            where: { payrollRunId, tenantId },
            orderBy: { versionNumber: 'desc' }
        });
        const versionNumber = latest ? latest.versionNumber + 1 : 1;
        return this.createJournal(tenantId, payrollRunId, versionNumber, tx);
    }
    async exists(tenantId, payrollRunId) {
        const count = await this.prisma.payPayrollJournal.count({
            where: { payrollRunId, tenantId }
        });
        return count > 0;
    }
};
exports.PayJournalRepository = PayJournalRepository;
exports.PayJournalRepository = PayJournalRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayJournalRepository);
//# sourceMappingURL=journal.repository.js.map