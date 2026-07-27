import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IBudgetEvaluationResult } from '../types/expense.types';
import { IBudgetRepository } from '../interfaces/repository.interfaces';
export declare class BudgetEngine {
    private readonly context;
    private readonly budgetRepo;
    constructor(context: ExpenseDomainContext, budgetRepo: IBudgetRepository);
    evaluateBudget(): Promise<IBudgetEvaluationResult>;
}
//# sourceMappingURL=budget.engine.d.ts.map