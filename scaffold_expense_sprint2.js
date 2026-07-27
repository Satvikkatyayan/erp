const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'expense');

const files = {
  'types/expense.types.ts': `import { ExpenseStatus, TravelStatus, BudgetAction } from '../constants/expense.enums';

export interface IExpensePolicyContextData {
  policyVersionId: string;
  approvalMatrixVersionId: string;
}

export interface IExpenseDomainContextData {
  claimId: string;
  employee: {
    id: string;
    departmentId: string;
  };
  organization: {
    id: string;
  };
  tenant: {
    id: string;
  };
  currency: string;
  totalAmount: number;
  policy: IExpensePolicyContextData;
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
    this.currentContext = data;
  }

  getContext(): IExpenseDomainContextData {
    if (!this.currentContext) {
      throw new Error('ExpenseDomainContext is not initialized.');
    }
    return this.currentContext;
  }
}
`,
  'engines/expense-policy.resolver.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ExpensePolicyResolver {
  constructor(private readonly context: ExpenseDomainContext) {}

  resolvePolicies(): boolean {
    const ctx = this.context.getContext();
    return true; // Mock true for now
  }
}
`,
  'engines/travel-policy.resolver.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class TravelPolicyResolver {
  constructor(private readonly context: ExpenseDomainContext) {}

  resolveTravelRules(): boolean {
    const ctx = this.context.getContext();
    return true;
  }
}
`,
  'engines/budget.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IBudgetEvaluationResult } from '../types/expense.types';
import { BudgetAction } from '../constants/expense.enums';

@Injectable()
export class BudgetEngine {
  constructor(private readonly context: ExpenseDomainContext) {}

  evaluateBudget(): IBudgetEvaluationResult {
    const ctx = this.context.getContext();
    return {
      action: BudgetAction.IGNORE,
      availableAmount: 10000,
    };
  }
}
`,
  'engines/expense-risk.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRiskAssessmentResult } from '../types/expense.types';
import { EXPENSE_CONSTANTS } from '../constants/expense.constants';

@Injectable()
export class ExpenseRiskEngine {
  constructor(private readonly context: ExpenseDomainContext) {}

  calculateRiskScore(claimData: any): IExpenseRiskAssessmentResult {
    const ctx = this.context.getContext();
    const flags = [];
    let score = 0;
    
    if (claimData.hasDuplicateReceipt) {
      score += EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT;
      flags.push({ rule: 'Duplicate Receipt', weight: EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT });
    }

    return { score, flags };
  }
}
`,
  'engines/approval-matrix.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ApprovalMatrixEngine {
  constructor(private readonly context: ExpenseDomainContext) {}

  generateApprovalChain(): any[] {
    const ctx = this.context.getContext();
    return [];
  }
}
`,
  'engines/expense-operation.engine.ts': `import { Injectable } from '@nestjs/common';
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

  executeOperation(operation: string, payload: any): any {
    const contextData: IExpenseDomainContextData = {
      claimId: payload.claimId || 'new-claim',
      employee: {
        id: payload.employeeId || 'unknown',
        departmentId: payload.departmentId || 'unknown',
      },
      organization: { id: payload.orgId || 'unknown' },
      tenant: { id: payload.tenantId || 'unknown' },
      totalAmount: payload.totalAmount || 0,
      currency: payload.currency || 'USD',
      policy: {
        policyVersionId: payload.policyVersionId || 'default-policy',
        approvalMatrixVersionId: payload.approvalMatrixVersionId || 'default-matrix',
      }
    };
    
    this.context.setContext(contextData);

    const isExpenseValid = this.expensePolicyResolver.resolvePolicies();
    const riskAssessment = this.riskEngine.calculateRiskScore(payload);
    const budgetEvaluation = this.budgetEngine.evaluateBudget();
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
`,
  'services/receipt.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class ReceiptService {
  async addReceipt(expenseItemId: string, fileData: any): Promise<any> {
    return { status: 'ADDED', expenseItemId };
  }

  async removeReceipt(receiptId: string): Promise<any> {
    return { status: 'REMOVED', receiptId };
  }
}
`,
  'services/expense-claim.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseOperationEngine } from '../engines/expense-operation.engine';
import { ReceiptService } from './receipt.service';

@Injectable()
export class ExpenseClaimService {
  constructor(
    private readonly operationEngine: ExpenseOperationEngine,
    private readonly receiptService: ReceiptService
  ) {}

  async createClaim(data: any): Promise<any> {
    return { status: 'DRAFT', claimId: 'new-id' };
  }

  async submitClaim(claimId: string): Promise<any> {
    return this.operationEngine.executeOperation('SUBMIT_CLAIM', { claimId });
  }

  async updateClaim(claimId: string, data: any): Promise<any> {
    return { status: 'UPDATED', claimId };
  }

  async deleteDraft(claimId: string): Promise<any> {
    return { status: 'DELETED', claimId };
  }
}
`,
  'services/advance.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class AdvanceService {
  async requestAdvance(travelRequestId: string, amount: number): Promise<any> {
    return { status: 'REQUESTED', travelRequestId, amount };
  }
  
  async issueAdvance(advanceId: string): Promise<any> {
    return { status: 'ISSUED', advanceId };
  }
}
`,
  'services/travel.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class TravelService {
  async requestTravel(data: any): Promise<any> {
    return { status: 'DRAFT', travelId: 'new-travel' };
  }

  async submitTravel(travelId: string): Promise<any> {
    return { status: 'SUBMITTED', travelId };
  }

  async completeTravel(travelId: string): Promise<any> {
    return { status: 'COMPLETED', travelId };
  }
}
`,
  'services/corporate-card.service.ts': `import { Injectable } from '@nestjs/common';

@Injectable()
export class CorporateCardService {
  async importStatement(statementData: any): Promise<any> {
    return { status: 'IMPORTED', transactionsProcessed: 0 };
  }

  async reconcileTransaction(transactionId: string, expenseItemId: string): Promise<any> {
    return { status: 'RECONCILED', transactionId, expenseItemId };
  }
}
`,
  'services/reimbursement.service.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseClaimService } from './expense-claim.service';

@Injectable()
export class ReimbursementService {
  constructor(private readonly expenseClaimService: ExpenseClaimService) {}

  async processReimbursement(claimId: string): Promise<any> {
    return { status: 'PROCESSED', claimId };
  }
}
`,
  'expense.module.ts': `import { Module } from '@nestjs/common';
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

@Module({
  providers: [
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
`
};

for (const [relativePath, content] of Object.entries(files)) {
  const fullPath = path.join(baseDir, relativePath);
  fs.mkdirSync(path.dirname(fullPath), { recursive: true });
  fs.writeFileSync(fullPath, content);
}

// Remove old expense-policy.context.ts since we renamed it to domain context
const oldContextPath = path.join(baseDir, 'context', 'expense-policy.context.ts');
if (fs.existsSync(oldContextPath)) {
  fs.unlinkSync(oldContextPath);
}

console.log('Sprint 2 Scaffold Complete!');
