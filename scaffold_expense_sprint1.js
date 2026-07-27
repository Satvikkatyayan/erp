const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'expense');

const files = {
  'constants/expense.enums.ts': `export enum ExpenseStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  POLICY_VALIDATION = 'POLICY_VALIDATION',
  APPROVAL = 'APPROVAL',
  FINANCE_APPROVAL = 'FINANCE_APPROVAL',
  PAYROLL_REIMBURSEMENT = 'PAYROLL_REIMBURSEMENT',
  CLOSED = 'CLOSED',
}

export enum TravelStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  APPROVED = 'APPROVED',
  ADVANCE_ISSUED = 'ADVANCE_ISSUED',
  TRAVEL_STARTED = 'TRAVEL_STARTED',
  TRAVEL_COMPLETED = 'TRAVEL_COMPLETED',
  EXPENSE_SUBMITTED = 'EXPENSE_SUBMITTED',
  SETTLEMENT = 'SETTLEMENT',
  CLOSED = 'CLOSED',
  ARCHIVED = 'ARCHIVED',
}

export enum BudgetAction {
  REJECT = 'REJECT',
  ESCALATE = 'ESCALATE',
  WARN = 'WARN',
  IGNORE = 'IGNORE',
}

export enum BudgetReservationStatus {
  PENDING = 'PENDING',
  CONVERTED = 'CONVERTED',
  RELEASED = 'RELEASED',
}

export enum ReceiptOcrStatus {
  PENDING = 'PENDING',
  PROCESSED = 'PROCESSED',
  FAILED = 'FAILED',
}

export enum CorporateCardImportStatus {
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}
`,
  'constants/expense.constants.ts': `export const EXPENSE_CONSTANTS = {
  DEFAULT_CURRENCY: 'USD',
  MAX_RISK_SCORE_THRESHOLD: 80,
  DUPLICATE_RECEIPT_WEIGHT: 40,
  SPLIT_EXPENSE_WEIGHT: 25,
  REPEATED_VIOLATION_WEIGHT: 30,
  LARGE_AMOUNT_WEIGHT: 20,
  INTERNATIONAL_TRAVEL_WEIGHT: 10,
};
`,
  'types/expense.types.ts': `import { ExpenseStatus, TravelStatus, BudgetAction } from '../constants/expense.enums';

export interface IExpensePolicyContextData {
  claimId: string;
  employeeId: string;
  departmentId: string;
  totalAmount: number;
  currency: string;
  policyVersionId: string;
  approvalMatrixVersionId: string;
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
  'context/expense-policy.context.ts': `import { Injectable } from '@nestjs/common';
import { IExpensePolicyContextData } from '../types/expense.types';

@Injectable()
export class ExpensePolicyContext {
  private currentContext: IExpensePolicyContextData | null = null;

  setContext(data: IExpensePolicyContextData): void {
    this.currentContext = data;
  }

  getContext(): IExpensePolicyContextData {
    if (!this.currentContext) {
      throw new Error('ExpensePolicyContext is not initialized.');
    }
    return this.currentContext;
  }
}
`,
  'engines/expense-policy.resolver.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';

@Injectable()
export class ExpensePolicyResolver {
  constructor(private readonly context: ExpensePolicyContext) {}

  resolvePolicies(): boolean {
    const ctx = this.context.getContext();
    // Pure logic to evaluate expense policies based on the context
    return true; // Mock true for now
  }
}
`,
  'engines/travel-policy.resolver.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';

@Injectable()
export class TravelPolicyResolver {
  constructor(private readonly context: ExpensePolicyContext) {}

  resolveTravelRules(): boolean {
    const ctx = this.context.getContext();
    // Pure logic to evaluate travel policies (flight class, hotel limits, etc.)
    return true;
  }
}
`,
  'engines/budget.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';
import { IBudgetEvaluationResult } from '../types/expense.types';
import { BudgetAction } from '../constants/expense.enums';

@Injectable()
export class BudgetEngine {
  constructor(private readonly context: ExpensePolicyContext) {}

  evaluateBudget(requestedAmount: number): IBudgetEvaluationResult {
    const ctx = this.context.getContext();
    // Pure logic for budget capacity checks
    return {
      action: BudgetAction.IGNORE,
      availableAmount: 10000,
    };
  }
}
`,
  'engines/expense-risk.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';
import { IExpenseRiskAssessmentResult } from '../types/expense.types';
import { EXPENSE_CONSTANTS } from '../constants/expense.constants';

@Injectable()
export class ExpenseRiskEngine {
  constructor(private readonly context: ExpensePolicyContext) {}

  calculateRiskScore(claimData: any): IExpenseRiskAssessmentResult {
    const ctx = this.context.getContext();
    // Weighted rules implementation
    const flags = [];
    let score = 0;
    
    // Example evaluation
    if (claimData.hasDuplicateReceipt) {
      score += EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT;
      flags.push({ rule: 'Duplicate Receipt', weight: EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT });
    }

    return {
      score,
      flags,
    };
  }
}
`,
  'engines/approval-matrix.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';

@Injectable()
export class ApprovalMatrixEngine {
  constructor(private readonly context: ExpensePolicyContext) {}

  generateApprovalChain(): any[] {
    const ctx = this.context.getContext();
    // Generates a deterministic approval chain based on the matrix version
    return [];
  }
}
`,
  'engines/expense-operation.engine.ts': `import { Injectable } from '@nestjs/common';
import { ExpensePolicyContext } from '../context/expense-policy.context';
import { ExpensePolicyResolver } from './expense-policy.resolver';
import { TravelPolicyResolver } from './travel-policy.resolver';
import { BudgetEngine } from './budget.engine';
import { ExpenseRiskEngine } from './expense-risk.engine';
import { ApprovalMatrixEngine } from './approval-matrix.engine';
import { IExpensePolicyContextData } from '../types/expense.types';

@Injectable()
export class ExpenseOperationEngine {
  constructor(
    private readonly context: ExpensePolicyContext,
    private readonly expensePolicyResolver: ExpensePolicyResolver,
    private readonly travelPolicyResolver: TravelPolicyResolver,
    private readonly budgetEngine: BudgetEngine,
    private readonly riskEngine: ExpenseRiskEngine,
    private readonly approvalMatrixEngine: ApprovalMatrixEngine,
  ) {}

  executeOperation(operation: string, payload: any): any {
    // This is the core engine where policies are resolved once per operation.
    // Ensure context is initialized before delegation.
    const contextData: IExpensePolicyContextData = {
      claimId: payload.claimId || 'new-claim',
      employeeId: payload.employeeId || 'unknown',
      departmentId: payload.departmentId || 'unknown',
      totalAmount: payload.totalAmount || 0,
      currency: payload.currency || 'USD',
      policyVersionId: payload.policyVersionId || 'default-policy',
      approvalMatrixVersionId: payload.approvalMatrixVersionId || 'default-matrix',
    };
    
    this.context.setContext(contextData);

    const isExpenseValid = this.expensePolicyResolver.resolvePolicies();
    const riskAssessment = this.riskEngine.calculateRiskScore(payload);
    const budgetEvaluation = this.budgetEngine.evaluateBudget(payload.totalAmount);
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
  'facades/expense.facade.ts': `import { Injectable } from '@nestjs/common';
import { ExpenseOperationEngine } from '../engines/expense-operation.engine';

@Injectable()
export class ExpenseFacade {
  constructor(private readonly operationEngine: ExpenseOperationEngine) {}

  submitExpenseClaim(payload: any): any {
    return this.operationEngine.executeOperation('SUBMIT_CLAIM', payload);
  }
  
  approveExpenseClaim(payload: any): any {
    return this.operationEngine.executeOperation('APPROVE_CLAIM', payload);
  }
}
`,
  'expense.module.ts': `import { Module } from '@nestjs/common';
import { ExpensePolicyContext } from './context/expense-policy.context';
import { ExpensePolicyResolver } from './engines/expense-policy.resolver';
import { TravelPolicyResolver } from './engines/travel-policy.resolver';
import { BudgetEngine } from './engines/budget.engine';
import { ExpenseRiskEngine } from './engines/expense-risk.engine';
import { ApprovalMatrixEngine } from './engines/approval-matrix.engine';
import { ExpenseOperationEngine } from './engines/expense-operation.engine';
import { ExpenseFacade } from './facades/expense.facade';

@Module({
  providers: [
    ExpensePolicyContext,
    ExpensePolicyResolver,
    TravelPolicyResolver,
    BudgetEngine,
    ExpenseRiskEngine,
    ApprovalMatrixEngine,
    ExpenseOperationEngine,
    ExpenseFacade,
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

// Scaffold empty directories for the rest
const emptyDirs = [
  'controllers', 'commands', 'queries', 'services', 'events', 
  'projections', 'workers', 'dto', 'validators', 'interfaces', 'utils'
];

for (const dir of emptyDirs) {
  fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
}

console.log('Sprint 1 Scaffold Complete!');
