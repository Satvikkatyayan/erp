import { ExpenseQueryService } from '../queries/expense-query.service';
import { TravelQueryService } from '../queries/travel-query.service';
import { BudgetQueryService } from '../queries/budget-query.service';
import { CorporateCardQueryService } from '../queries/corporate-card-query.service';
export declare class ExpenseReadFacade {
    readonly expenseQuery: ExpenseQueryService;
    readonly travelQuery: TravelQueryService;
    readonly budgetQuery: BudgetQueryService;
    readonly corporateCardQuery: CorporateCardQueryService;
    constructor(expenseQuery: ExpenseQueryService, travelQuery: TravelQueryService, budgetQuery: BudgetQueryService, corporateCardQuery: CorporateCardQueryService);
}
//# sourceMappingURL=expense-read.facade.d.ts.map