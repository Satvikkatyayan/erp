import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ExpensePolicyResolver } from './expense-policy.resolver';
import { TravelPolicyResolver } from './travel-policy.resolver';
import { BudgetEngine } from './budget.engine';
import { ExpenseRiskEngine } from './expense-risk.engine';
import { ApprovalMatrixEngine } from './approval-matrix.engine';
import { ContextFactory } from '../../../core/context/context.factory';
export declare class ExpenseOperationEngine {
    private readonly context;
    private readonly expensePolicyResolver;
    private readonly travelPolicyResolver;
    private readonly budgetEngine;
    private readonly riskEngine;
    private readonly approvalMatrixEngine;
    private readonly contextFactory;
    constructor(context: ExpenseDomainContext, expensePolicyResolver: ExpensePolicyResolver, travelPolicyResolver: TravelPolicyResolver, budgetEngine: BudgetEngine, riskEngine: ExpenseRiskEngine, approvalMatrixEngine: ApprovalMatrixEngine, contextFactory: ContextFactory);
    executeOperation(operation: string, payload: any): Promise<any>;
}
//# sourceMappingURL=expense-operation.engine.d.ts.map