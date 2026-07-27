import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse } from '../dto/responses/standard.response';
export declare class BudgetQueryController {
    private readonly readFacade;
    constructor(readFacade: ExpenseReadFacade);
    getDepartmentBudget(id: string): Promise<QueryResponse>;
    getBudgetUtilization(id: string): Promise<QueryResponse>;
    getRemainingAllocations(id: string): Promise<QueryResponse>;
}
//# sourceMappingURL=budget-query.controller.d.ts.map