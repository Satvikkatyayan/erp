import { Injectable } from '@nestjs/common';
import { ExpenseQueryService } from '../queries/expense-query.service';
import { TravelQueryService } from '../queries/travel-query.service';
import { BudgetQueryService } from '../queries/budget-query.service';
import { CorporateCardQueryService } from '../queries/corporate-card-query.service';

@Injectable()
export class ExpenseReadFacade {
  constructor(
    public readonly expenseQuery: ExpenseQueryService,
    public readonly travelQuery: TravelQueryService,
    public readonly budgetQuery: BudgetQueryService,
    public readonly corporateCardQuery: CorporateCardQueryService,
  ) {}
}
