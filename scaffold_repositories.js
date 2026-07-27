const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'expense');

// 1. Create interfaces file
const interfacesContent = `export const EXPENSE_REPOSITORY_TOKEN = 'IExpenseRepository';
export const RECEIPT_REPOSITORY_TOKEN = 'IReceiptRepository';
export const TRAVEL_REPOSITORY_TOKEN = 'ITravelRepository';
export const CORPORATE_CARD_REPOSITORY_TOKEN = 'ICorporateCardRepository';
export const BUDGET_REPOSITORY_TOKEN = 'IBudgetRepository';

export interface IExpenseRepository {
  createDraft(payload: any): Promise<any>;
  update(claimId: string, payload: any): Promise<any>;
  findById(claimId: string): Promise<any>;
}

export interface IReceiptRepository {
  saveMetadata(itemId: string, metadata: any): Promise<any>;
  findByFingerprint(fingerprint: string): Promise<any>;
  delete(receiptId: string): Promise<any>;
}

export interface ITravelRepository {
  createRequest(payload: any): Promise<any>;
  update(travelId: string, payload: any): Promise<any>;
}

export interface ICorporateCardRepository {
  importStatement(statementData: any): Promise<any>;
  saveTransactions(statementId: string, transactions: any[]): Promise<any>;
}

export interface IBudgetRepository {
  getAvailableBudget(budgetId: string): Promise<number>;
  reserveBudget(budgetId: string, amount: number): Promise<any>;
}
`;

fs.writeFileSync(path.join(baseDir, 'interfaces', 'repository.interfaces.ts'), interfacesContent);

// 2. Update receipt.service.ts
const receiptSvc = `import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { createHash } from 'crypto';
import { IReceiptRepository, RECEIPT_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class ReceiptService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(RECEIPT_REPOSITORY_TOKEN) private readonly receiptRepo: IReceiptRepository
  ) {}

  async uploadReceiptMetadata(itemId: string, metadata: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.receiptRepo.saveMetadata(itemId, metadata);
    return { status: 'METADATA_UPLOADED', itemId, tenantId: ctx.tenant.id };
  }

  generateFingerprint(fileBuffer: Buffer): string {
    return createHash('sha256').update(fileBuffer).digest('hex');
  }

  async checkDuplicate(fingerprint: string): Promise<boolean> {
    const duplicate = await this.receiptRepo.findByFingerprint(fingerprint);
    return !!duplicate;
  }

  async persistOcrMetadata(receiptId: string, ocrData: any): Promise<any> {
    return { status: 'OCR_PERSISTED', receiptId };
  }

  async deleteReceipt(receiptId: string): Promise<any> {
    await this.receiptRepo.delete(receiptId);
    return { status: 'DELETED', receiptId };
  }

  async validateReceipt(receiptId: string): Promise<boolean> {
    return true;
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'receipt.service.ts'), receiptSvc);


// 3. Update expense-claim.service.ts
const expenseClaimSvc = `import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRepository, EXPENSE_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class ExpenseClaimService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(EXPENSE_REPOSITORY_TOKEN) private readonly expenseRepo: IExpenseRepository
  ) {}

  async createDraft(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.expenseRepo.createDraft(payload);
    return { status: 'DRAFT_CREATED', employeeId: ctx.employee.id };
  }

  async updateDraft(claimId: string, payload: any): Promise<any> {
    await this.expenseRepo.update(claimId, payload);
    return { status: 'DRAFT_UPDATED', claimId };
  }

  async addExpenseItem(claimId: string, itemData: any): Promise<any> {
    return { status: 'ITEM_ADDED', claimId };
  }

  async removeExpenseItem(claimId: string, itemId: string): Promise<any> {
    return { status: 'ITEM_REMOVED', itemId };
  }

  async attachReceipt(itemId: string, receiptId: string): Promise<any> {
    return { status: 'RECEIPT_ATTACHED', itemId, receiptId };
  }

  calculateTotals(claimId: string): number {
    return 0; // Totals based on baseCurrency from currencyContext
  }

  async submitDraft(claimId: string): Promise<any> {
    return { status: 'SUBMITTED', claimId };
  }

  async cancelDraft(claimId: string): Promise<any> {
    return { status: 'CANCELLED', claimId };
  }

  async lockClaim(claimId: string): Promise<any> {
    return { status: 'LOCKED', claimId };
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'expense-claim.service.ts'), expenseClaimSvc);


// 4. Update travel.service.ts
const travelSvc = `import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ITravelRepository, TRAVEL_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class TravelService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(TRAVEL_REPOSITORY_TOKEN) private readonly travelRepo: ITravelRepository
  ) {}

  async requestTravel(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.travelRepo.createRequest(payload);
    return { status: 'TRAVEL_REQUESTED', employeeId: ctx.employee.id };
  }

  async addItinerary(travelId: string, itinerary: any): Promise<any> {
    return { status: 'ITINERARY_ADDED', travelId };
  }

  async addBookingReference(travelId: string, ref: string): Promise<any> {
    return { status: 'BOOKING_REF_ADDED', travelId };
  }

  async completeTravel(travelId: string): Promise<any> {
    return { status: 'TRAVEL_COMPLETED', travelId };
  }

  async linkExpenseClaim(travelId: string, claimId: string): Promise<any> {
    return { status: 'CLAIM_LINKED', travelId, claimId };
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'travel.service.ts'), travelSvc);


// 5. Update corporate-card.service.ts
const cardSvc = `import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ICorporateCardRepository, CORPORATE_CARD_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class CorporateCardService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(CORPORATE_CARD_REPOSITORY_TOKEN) private readonly cardRepo: ICorporateCardRepository
  ) {}

  async assignCard(employeeId: string, cardData: any): Promise<any> {
    return { status: 'CARD_ASSIGNED', employeeId };
  }

  async importStatement(statementData: any): Promise<any> {
    await this.cardRepo.importStatement(statementData);
    return { status: 'STATEMENT_IMPORTED' };
  }

  async importTransactions(statementId: string, transactions: any[]): Promise<any> {
    await this.cardRepo.saveTransactions(statementId, transactions);
    return { status: 'TRANSACTIONS_IMPORTED', statementId };
  }

  async matchExpense(transactionId: string, potentialExpenseIds: string[]): Promise<any> {
    return { status: 'EXPENSES_MATCHED', transactionId };
  }

  async reconcileTransaction(transactionId: string, expenseItemId: string): Promise<any> {
    return { status: 'RECONCILED', transactionId, expenseItemId };
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'corporate-card.service.ts'), cardSvc);


// 6. Update budget.engine.ts
const budgetEngine = `import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IBudgetEvaluationResult } from '../types/expense.types';
import { BudgetAction } from '../constants/expense.enums';
import { IBudgetRepository, BUDGET_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class BudgetEngine {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(BUDGET_REPOSITORY_TOKEN) private readonly budgetRepo: IBudgetRepository
  ) {}

  async evaluateBudget(): Promise<IBudgetEvaluationResult> {
    const ctx = this.context.getContext();
    if (ctx.budgetContext?.budgetId) {
       const available = await this.budgetRepo.getAvailableBudget(ctx.budgetContext.budgetId);
       return {
         action: BudgetAction.IGNORE,
         availableAmount: available,
       };
    }
    return {
      action: BudgetAction.IGNORE,
      availableAmount: 10000,
    };
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'engines', 'budget.engine.ts'), budgetEngine);

// 7. Update expense-operation.engine.ts (since BudgetEngine evaluateBudget is now async)
const operationEngine = `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ExpensePolicyResolver } from './expense-policy.resolver';
import { TravelPolicyResolver } from './travel-policy.resolver';
import { BudgetEngine } from './budget.engine';
import { ExpenseRiskEngine } from './expense-risk.engine';
import { ApprovalMatrixEngine } from './approval-matrix.engine';
import { IExpenseDomainContextData } from '../types/expense.types';

@Injectable()
export class ExpenseOperationEngine {
  constructor(
    private readonly context: ExpenseDomainContext,
    private readonly expensePolicyResolver: ExpensePolicyResolver,
    private readonly travelPolicyResolver: TravelPolicyResolver,
    private readonly budgetEngine: BudgetEngine,
    private readonly riskEngine: ExpenseRiskEngine,
    private readonly approvalMatrixEngine: ApprovalMatrixEngine,
  ) {}

  async executeOperation(operation: string, payload: any): Promise<any> {
    const contextData: IExpenseDomainContextData = {
      employee: {
        id: payload.employeeId || 'unknown',
        departmentId: payload.departmentId || 'unknown',
      },
      organization: { id: payload.orgId || 'unknown' },
      tenant: { id: payload.tenantId || 'unknown' },
      policyContext: {
        policyVersionId: payload.policyVersionId || 'default-policy',
      },
      budgetContext: {},
      approvalContext: {
        approvalMatrixVersionId: payload.approvalMatrixVersionId || 'default-matrix'
      },
      currencyContext: {
        baseCurrency: 'USD',
        transactionCurrency: payload.currency || 'USD'
      },
      requestMetadata: {
        timestamp: new Date()
      }
    };
    
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
}
`;
fs.writeFileSync(path.join(baseDir, 'engines', 'expense-operation.engine.ts'), operationEngine);


// 8. Update expense.facade.ts (async)
const facade = `import { Injectable } from '@nestjs/common';
import { ExpenseOperationEngine } from '../engines/expense-operation.engine';

@Injectable()
export class ExpenseFacade {
  constructor(private readonly operationEngine: ExpenseOperationEngine) {}

  async submitExpenseClaim(payload: any): Promise<any> {
    return this.operationEngine.executeOperation('SUBMIT_CLAIM', payload);
  }
  
  async approveExpenseClaim(payload: any): Promise<any> {
    return this.operationEngine.executeOperation('APPROVE_CLAIM', payload);
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'facades', 'expense.facade.ts'), facade);

// 9. Update expense.module.ts with dummy providers for the tokens
const moduleContent = `import { Module } from '@nestjs/common';
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

@Module({
  providers: [
    { provide: EXPENSE_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: RECEIPT_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: TRAVEL_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: CORPORATE_CARD_REPOSITORY_TOKEN, useValue: mockProvider },
    { provide: BUDGET_REPOSITORY_TOKEN, useValue: mockProvider },

    ExpenseDomainContext,
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
`;
fs.writeFileSync(path.join(baseDir, 'expense.module.ts'), moduleContent);

console.log('Repositories Abstracted!');
