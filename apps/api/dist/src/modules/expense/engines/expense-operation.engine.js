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
exports.ExpenseOperationEngine = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("../context/expense-domain.context");
const expense_policy_resolver_1 = require("./expense-policy.resolver");
const travel_policy_resolver_1 = require("./travel-policy.resolver");
const budget_engine_1 = require("./budget.engine");
const expense_risk_engine_1 = require("./expense-risk.engine");
const approval_matrix_engine_1 = require("./approval-matrix.engine");
const context_factory_1 = require("../../../core/context/context.factory");
let ExpenseOperationEngine = class ExpenseOperationEngine {
    constructor(context, expensePolicyResolver, travelPolicyResolver, budgetEngine, riskEngine, approvalMatrixEngine, contextFactory) {
        this.context = context;
        this.expensePolicyResolver = expensePolicyResolver;
        this.travelPolicyResolver = travelPolicyResolver;
        this.budgetEngine = budgetEngine;
        this.riskEngine = riskEngine;
        this.approvalMatrixEngine = approvalMatrixEngine;
        this.contextFactory = contextFactory;
    }
    async executeOperation(operation, payload) {
        const contextData = this.contextFactory.createExpenseDomainContext(payload);
        this.context.setContext(contextData);
        const isExpenseValid = this.expensePolicyResolver.resolvePolicies();
        const riskAssessment = this.riskEngine.calculateRiskScore(payload);
        const budgetEvaluation = await this.budgetEngine.evaluateBudget();
        const approvalChain = this.approvalMatrixEngine.generateApprovalChain();
        return {
            status: 'SUCCESS',
            isExpenseValid,
            riskAssessment,
            budgetEvaluation,
            approvalChain,
        };
    }
};
exports.ExpenseOperationEngine = ExpenseOperationEngine;
exports.ExpenseOperationEngine = ExpenseOperationEngine = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [expense_domain_context_1.ExpenseDomainContext,
        expense_policy_resolver_1.ExpensePolicyResolver,
        travel_policy_resolver_1.TravelPolicyResolver,
        budget_engine_1.BudgetEngine,
        expense_risk_engine_1.ExpenseRiskEngine,
        approval_matrix_engine_1.ApprovalMatrixEngine,
        context_factory_1.ContextFactory])
], ExpenseOperationEngine);
//# sourceMappingURL=expense-operation.engine.js.map