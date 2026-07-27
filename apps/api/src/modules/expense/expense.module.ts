import { Module } from '@nestjs/common';
import { ExpenseDomainContext } from './context/expense-domain.context';
import { ExpensePolicyResolver } from './engines/expense-policy.resolver';
import { TravelPolicyResolver } from './engines/travel-policy.resolver';
import { BudgetEngine } from './engines/budget.engine';
import { ExpenseRiskEngine } from './engines/expense-risk.engine';
import { ApprovalMatrixEngine } from './engines/approval-matrix.engine';
import { ExpenseOperationEngine } from './engines/expense-operation.engine';
import { ExpenseFacade } from './facades/expense.facade';

// Services
import { ReceiptService } from './services/receipt.service';
import { ExpenseClaimService } from './services/expense-claim.service';
import { AdvanceService } from './services/advance.service';
import { TravelService } from './services/travel.service';
import { CorporateCardService } from './services/corporate-card.service';
import { ReimbursementService } from './services/reimbursement.service';

// Tokens
import { 
  EXPENSE_REPOSITORY_TOKEN, 
  RECEIPT_REPOSITORY_TOKEN, 
  TRAVEL_REPOSITORY_TOKEN, 
  CORPORATE_CARD_REPOSITORY_TOKEN, 
  BUDGET_REPOSITORY_TOKEN 
} from './interfaces/repository.interfaces';

// Mock Providers (to be replaced with Prisma implementations later)
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

import { ExpenseEventBus } from './events/expense-event.bus';
import { ProcessedEventStore } from './events/idempotency/processed-event.store';

@Module({
  providers: [
    { provide: EXPENSE_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: RECEIPT_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: TRAVEL_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: CORPORATE_CARD_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: BUDGET_REPOSITORY_TOKEN, useValue: mockProvider },

    ExpenseDomainContext,
    ProcessedEventStore,
    ExpenseEventBus,
    ExpensePolicyResolver,
    TravelPolicyResolver,
    BudgetEngine,
    ExpenseRiskEngine,
    ApprovalMatrixEngine,
    ExpenseOperationEngine,
    ExpenseFacade,
    
    ReceiptService,
    ExpenseClaimService,
    AdvanceService,
    TravelService,
    CorporateCardService,
    ReimbursementService,
  ],
  exports: [ExpenseFacade],
})
export class ExpenseModule {}
