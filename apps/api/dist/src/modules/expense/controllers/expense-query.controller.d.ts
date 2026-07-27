import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
export declare class ExpenseQueryController {
    private readonly readFacade;
    constructor(readFacade: ExpenseReadFacade);
    getMyExpenses(params: any): Promise<PagedResponse>;
    getExpenseDetail(id: string): Promise<QueryResponse>;
    getPendingReimbursements(): Promise<PagedResponse>;
    getEmployeeDashboard(): Promise<QueryResponse>;
}
//# sourceMappingURL=expense-query.controller.d.ts.map