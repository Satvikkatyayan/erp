"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpenseModule = void 0;
const common_1 = require("@nestjs/common");
const expense_domain_context_1 = require("./context/expense-domain.context");
const expense_policy_resolver_1 = require("./engines/expense-policy.resolver");
const travel_policy_resolver_1 = require("./engines/travel-policy.resolver");
const budget_engine_1 = require("./engines/budget.engine");
const expense_risk_engine_1 = require("./engines/expense-risk.engine");
const approval_matrix_engine_1 = require("./engines/approval-matrix.engine");
const expense_operation_engine_1 = require("./engines/expense-operation.engine");
const expense_facade_1 = require("./facades/expense.facade");
const receipt_service_1 = require("./services/receipt.service");
const expense_claim_service_1 = require("./services/expense-claim.service");
const advance_service_1 = require("./services/advance.service");
const travel_service_1 = require("./services/travel.service");
const corporate_card_service_1 = require("./services/corporate-card.service");
const reimbursement_service_1 = require("./services/reimbursement.service");
const repository_interfaces_1 = require("./interfaces/repository.interfaces");
const mockProvider = {
    createDraft: async () => ({}),
    update: async () => ({}),
    findById: async () => ({}),
    saveMetadata: async () => ({}),
    findByFingerprint: async () => null,
    delete: async () => ({}),
    createRequest: async () => ({}),
    importStatement: async () => ({}),
    saveTransactions: async () => ({}),
    getAvailableBudget: async () => 10000,
    reserveBudget: async () => ({}),
};
const expense_event_bus_1 = require("./events/expense-event.bus");
const processed_event_store_1 = require("./events/idempotency/processed-event.store");
let ExpenseModule = class ExpenseModule {
};
exports.ExpenseModule = ExpenseModule;
exports.ExpenseModule = ExpenseModule = __decorate([
    (0, common_1.Module)({
        providers: [
            { provide: repository_interfaces_1.EXPENSE_REPOSITORY_TOKEN, useValue: mockProvider },
            { provide: repository_interfaces_1.RECEIPT_REPOSITORY_TOKEN, useValue: mockProvider },
            { provide: repository_interfaces_1.TRAVEL_REPOSITORY_TOKEN, useValue: mockProvider },
            { provide: repository_interfaces_1.CORPORATE_CARD_REPOSITORY_TOKEN, useValue: mockProvider },
            { provide: repository_interfaces_1.BUDGET_REPOSITORY_TOKEN, useValue: mockProvider },
            expense_domain_context_1.ExpenseDomainContext,
            processed_event_store_1.ProcessedEventStore,
            expense_event_bus_1.ExpenseEventBus,
            expense_policy_resolver_1.ExpensePolicyResolver,
            travel_policy_resolver_1.TravelPolicyResolver,
            budget_engine_1.BudgetEngine,
            expense_risk_engine_1.ExpenseRiskEngine,
            approval_matrix_engine_1.ApprovalMatrixEngine,
            expense_operation_engine_1.ExpenseOperationEngine,
            expense_facade_1.ExpenseFacade,
            receipt_service_1.ReceiptService,
            expense_claim_service_1.ExpenseClaimService,
            advance_service_1.AdvanceService,
            travel_service_1.TravelService,
            corporate_card_service_1.CorporateCardService,
            reimbursement_service_1.ReimbursementService,
        ],
        exports: [expense_facade_1.ExpenseFacade],
    })
], ExpenseModule);
//# sourceMappingURL=expense.module.js.map