import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRiskAssessmentResult } from '../types/expense.types';
export declare class ExpenseRiskEngine {
    private readonly context;
    constructor(context: ExpenseDomainContext);
    calculateRiskScore(claimData: any): IExpenseRiskAssessmentResult;
}
//# sourceMappingURL=expense-risk.engine.d.ts.map