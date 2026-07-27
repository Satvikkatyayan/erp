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
exports.ExpenseRiskEngine = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const expense_constants_1 = require("../constants/expense.constants");
let ExpenseRiskEngine = class ExpenseRiskEngine {
    constructor(context) {
        this.context = context;
    }
    calculateRiskScore(claimData) {
        const ctx = this.context.getContext();
        const flags = [];
        let score = 0;
        if (claimData.hasDuplicateReceipt) {
            score += expense_constants_1.EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT;
            flags.push({ rule: 'Duplicate Receipt', weight: expense_constants_1.EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT });
        }
        return { score, flags };
    }
};
exports.ExpenseRiskEngine = ExpenseRiskEngine;
exports.ExpenseRiskEngine = ExpenseRiskEngine = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext])
], ExpenseRiskEngine);
//# sourceMappingURL=expense-risk.engine.js.map