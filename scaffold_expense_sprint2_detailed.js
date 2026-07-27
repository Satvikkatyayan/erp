const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'expense');

const files = {
  'types/expense.types.ts': `import { ExpenseStatus, TravelStatus, BudgetAction } from '../constants/expense.enums';

export interface IExpensePolicyContextData {
  policyVersionId: string;
  rulesSnapshot?: any;
}

export interface IBudgetContextData {
  budgetId?: string;
  departmentId?: string;
}

export interface IApprovalContextData {
  approvalMatrixVersionId: string;
}

export interface ICurrencyContextData {
  baseCurrency: string;
  transactionCurrency: string;
  exchangeRate?: number;
}

export interface IExpenseDomainContextData {
  tenant: { id: string };
  organization: { id: string };
  employee: { id: string; departmentId: string; roleId?: string };
  policyContext: IExpensePolicyContextData;
  budgetContext: IBudgetContextData;
  approvalContext: IApprovalContextData;
  currencyContext: ICurrencyContextData;
  requestMetadata: {
    ipAddress?: string;
    userAgent?: string;
    timestamp: Date;
  };
}

export interface IExpenseRiskAssessmentResult {
  score: number;
  flags: Array<{ rule: string; weight: number }>;
}

export interface IBudgetEvaluationResult {
  action: BudgetAction;
  availableAmount: number;
  exceededBy?: number;
}
`,
  'context/expense-domain.context.ts': `import { Injectable } from '@nestjs/common';
import { IExpenseDomainContextData } from '../types/expense.types';

@Injectable()
export class ExpenseDomainContext {
  private currentContext: IExpenseDomainContextData | null = null;

  setContext(data: IExpenseDomainContextData): void {
    this.currentContext = Object.freeze({ ...data }); // Immutable for one operation
  }

  getContext(): IExpenseDomainContextData {
    if (!this.currentContext) {
      throw new Error('ExpenseDomainContext is not initialized.');
    }
    return this.currentContext;
  }
}
`,
  'services/receipt.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { createHash } from 'crypto';

@Injectable()
export class ReceiptService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async uploadReceiptMetadata(itemId: string, metadata: any): Promise<any> {
    const ctx = this.context.getContext();
    return { status: 'METADATA_UPLOADED', itemId, tenantId: ctx.tenant.id };
  }

  generateFingerprint(fileBuffer: Buffer): string {
    return createHash('sha256').update(fileBuffer).digest('hex');
  }

  async checkDuplicate(fingerprint: string): Promise<boolean> {
    // Lookup duplicate by SHA-256
    return false;
  }

  async persistOcrMetadata(receiptId: string, ocrData: any): Promise<any> {
    return { status: 'OCR_PERSISTED', receiptId };
  }

  async deleteReceipt(receiptId: string): Promise<any> {
    return { status: 'DELETED', receiptId };
  }

  async validateReceipt(receiptId: string): Promise<boolean> {
    return true;
  }
}
`,
  'services/expense-claim.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ExpenseClaimService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async createDraft(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    return { status: 'DRAFT_CREATED', employeeId: ctx.employee.id };
  }

  async updateDraft(claimId: string, payload: any): Promise<any> {
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
`,
  'services/advance.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class AdvanceService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async requestAdvance(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    return { status: 'ADVANCE_REQUESTED', employeeId: ctx.employee.id };
  }

  async modifyAdvance(advanceId: string, payload: any): Promise<any> {
    return { status: 'ADVANCE_MODIFIED', advanceId };
  }

  async approveAdvancePayload(advanceId: string): Promise<any> {
    return { status: 'ADVANCE_PAYLOAD_READY', advanceId };
  }

  async recoverAdvance(advanceId: string): Promise<any> {
    return { status: 'ADVANCE_RECOVERED', advanceId };
  }

  calculateSettlement(advanceId: string, expensesTotal: number): number {
    return expensesTotal; // Return reimbursement payload
  }
}
`,
  'services/travel.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class TravelService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async requestTravel(payload: any): Promise<any> {
    const ctx = this.context.getContext();
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
`,
  'services/corporate-card.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class CorporateCardService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async assignCard(employeeId: string, cardData: any): Promise<any> {
    return { status: 'CARD_ASSIGNED', employeeId };
  }

  async importStatement(statementData: any): Promise<any> {
    return { status: 'STATEMENT_IMPORTED' };
  }

  async importTransactions(statementId: string, transactions: any[]): Promise<any> {
    return { status: 'TRANSACTIONS_IMPORTED', statementId };
  }

  async matchExpense(transactionId: string, potentialExpenseIds: string[]): Promise<any> {
    return { status: 'EXPENSES_MATCHED', transactionId };
  }

  async reconcileTransaction(transactionId: string, expenseItemId: string): Promise<any> {
    return { status: 'RECONCILED', transactionId, expenseItemId };
  }
}
`,
  'services/reimbursement.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ReimbursementService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async prepareReimbursementPayload(claimId: string): Promise<any> {
    return { status: 'PAYLOAD_PREPARED', claimId };
  }

  async coordinatePayrollSdk(payload: any): Promise<any> {
    // Only coordinates SDK, doesn't execute payment directly
    return { status: 'PAYROLL_NOTIFIED' };
  }

  async updateReimbursementStatus(claimId: string, status: string): Promise<any> {
    return { status: 'STATUS_UPDATED', claimId };
  }

  async retryFailedReimbursement(claimId: string): Promise<any> {
    return { status: 'RETRIED', claimId };
  }

  async executeFinalSettlement(claimId: string): Promise<any> {
    return { status: 'SETTLED', claimId };
  }
}
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(baseDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

console.log('Sprint 2 Detailed Services Generated!');
