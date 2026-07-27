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
exports.ExpenseClaimService = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const repository_interfaces_1 = require("../interfaces/repository.interfaces");
let ExpenseClaimService = class ExpenseClaimService {
    constructor(context, expenseRepo) {
        this.context = context;
        this.expenseRepo = expenseRepo;
    }
    async createDraft(payload) {
        const ctx = this.context.getContext();
        await this.expenseRepo.createDraft(payload);
        return { status: 'DRAFT_CREATED', employeeId: ctx.employee.id };
    }
    async updateDraft(claimId, payload) {
        await this.expenseRepo.update(claimId, payload);
        return { status: 'DRAFT_UPDATED', claimId };
    }
    async addExpenseItem(claimId, itemData) {
        return { status: 'ITEM_ADDED', claimId };
    }
    async removeExpenseItem(claimId, itemId) {
        return { status: 'ITEM_REMOVED', itemId };
    }
    async attachReceipt(itemId, receiptId) {
        return { status: 'RECEIPT_ATTACHED', itemId, receiptId };
    }
    calculateTotals(claimId) {
        return 0;
    }
    async submitDraft(claimId) {
        return { status: 'SUBMITTED', claimId };
    }
    async cancelDraft(claimId) {
        return { status: 'CANCELLED', claimId };
    }
    async lockClaim(claimId) {
        return { status: 'LOCKED', claimId };
    }
};
exports.ExpenseClaimService = ExpenseClaimService;
exports.ExpenseClaimService = ExpenseClaimService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(repository_interfaces_1.EXPENSE_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext, Object])
], ExpenseClaimService);
//# sourceMappingURL=expense-claim.service.js.map