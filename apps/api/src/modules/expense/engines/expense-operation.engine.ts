import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ExpensePolicyResolver } from './expense-policy.resolver';
import { TravelPolicyResolver } from './travel-policy.resolver';
import { BudgetEngine } from './budget.engine';
import { ExpenseRiskEngine } from './expense-risk.engine';
import { ApprovalMatrixEngine } from './approval-matrix.engine';
import { IExpenseDomainContextData } from '../types/expense.types';
import { ContextFactory } from '../../../core/context/context.factory';

@Injectable()
export class ExpenseOperationEngine {
  constructor(
    private readonly context: ExpenseDomainContext,
    private readonly expensePolicyResolver: ExpensePolicyResolver,
    private readonly travelPolicyResolver: TravelPolicyResolver,
    private readonly budgetEngine: BudgetEngine,
    private readonly riskEngine: ExpenseRiskEngine,
    private readonly approvalMatrixEngine: ApprovalMatrixEngine,
    private readonly contextFactory: ContextFactory,
  ) {}

  async executeOperation(operation: string, payload: any): Promise<any> {
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
}
