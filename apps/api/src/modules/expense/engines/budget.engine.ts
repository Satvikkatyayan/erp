import { Injectable, Inject } from '@nestjs/common';
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
