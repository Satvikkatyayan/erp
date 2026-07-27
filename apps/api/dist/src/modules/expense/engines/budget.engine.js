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
exports.BudgetEngine = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const expense_enums_1 = require("../constants/expense.enums");
const repository_interfaces_1 = require("../interfaces/repository.interfaces");
let BudgetEngine = class BudgetEngine {
    constructor(context, budgetRepo) {
        this.context = context;
        this.budgetRepo = budgetRepo;
    }
    async evaluateBudget() {
        const ctx = this.context.getContext();
        if (ctx.budgetContext?.budgetId) {
            const available = await this.budgetRepo.getAvailableBudget(ctx.budgetContext.budgetId);
            return {
                action: expense_enums_1.BudgetAction.IGNORE,
                availableAmount: available,
            };
        }
        return {
            action: expense_enums_1.BudgetAction.IGNORE,
            availableAmount: 10000,
        };
    }
};
exports.BudgetEngine = BudgetEngine;
exports.BudgetEngine = BudgetEngine = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, common_1.Inject)(repository_interfaces_1.BUDGET_REPOSITORY_TOKEN)),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext, Object])
], BudgetEngine);
//# sourceMappingURL=budget.engine.js.map