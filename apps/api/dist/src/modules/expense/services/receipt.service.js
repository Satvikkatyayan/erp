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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptService = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const crypto_1 = require("crypto");
const repository_interfaces_1 = require("../interfaces/repository.interfaces");
let ReceiptService = class ReceiptService {
    constructor(context, receiptRepo) {
        this.context = context;
        this.receiptRepo = receiptRepo;
    }
    async uploadReceiptMetadata(itemId, metadata) {
        const ctx = this.context.getContext();
        await this.receiptRepo.saveMetadata(itemId, metadata);
        return { status: 'METADATA_UPLOADED', itemId, tenantId: ctx.tenant.id };
    }
    generateFingerprint(fileBuffer) {
        return (0, crypto_1.createHash)('sha256').update(fileBuffer).digest('hex');
    }
    async checkDuplicate(fingerprint) {
        const duplicate = await this.receiptRepo.findByFingerprint(fingerprint);
        return !!duplicate;
    }
    async persistOcrMetadata(receiptId, ocrData) {
        return { status: 'OCR_PERSISTED', receiptId };
    }
    async deleteReceipt(receiptId) {
        await this.receiptRepo.delete(receiptId);
        return { status: 'DELETED', receiptId };
    }
    async validateReceipt(receiptId) {
        return true;
    }
};
exports.ReceiptService = ReceiptService;
exports.ReceiptService = ReceiptService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(repository_interfaces_1.RECEIPT_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext, Object])
], ReceiptService);
//# sourceMappingURL=receipt.service.js.map