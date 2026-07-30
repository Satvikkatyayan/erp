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
exports.PayPaymentBatchRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const uuid_1 = require("uuid");
let PayPaymentBatchRepository = class PayPaymentBatchRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createBatch(tenantId, payrollRunId, versionNumber, tx) {
        const client = tx || this.prisma;
        await client.payPaymentBatch.updateMany({
            where: { payrollRunId, tenantId, status: { in: ['Draft', 'Approved'] } },
            data: { status: 'Cancelled' }
        });
        return client.payPaymentBatch.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId,
                payrollRunId,
                versionNumber,
                status: 'Draft'
            }
        });
    }
    async createInstructions(instructions, tx) {
        const client = tx || this.prisma;
        if (instructions.length === 0)
            return;
        await client.payPaymentInstruction.createMany({
            data: instructions
        });
    }
    async getBatch(tenantId, payrollRunId) {
        return this.prisma.payPaymentBatch.findFirst({
            where: { payrollRunId, tenantId, status: { not: 'Cancelled' } },
            orderBy: { versionNumber: 'desc' },
            include: { instructions: true }
        });
    }
    async exists(tenantId, payrollRunId) {
        const count = await this.prisma.payPaymentBatch.count({
            where: { payrollRunId, tenantId, status: { not: 'Cancelled' } }
        });
        return count > 0;
    }
};
exports.PayPaymentBatchRepository = PayPaymentBatchRepository;
exports.PayPaymentBatchRepository = PayPaymentBatchRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PayPaymentBatchRepository);
//# sourceMappingURL=payment-batch.repository.js.map