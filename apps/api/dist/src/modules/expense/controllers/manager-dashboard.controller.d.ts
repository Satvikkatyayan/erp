import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
export declare class ManagerDashboardController {
    private readonly readFacade;
    constructor(readFacade: ExpenseReadFacade);
    getPendingApprovals(): Promise<PagedResponse>;
    getTeamExpenses(teamId: string): Promise<PagedResponse>;
    getRiskSummaries(): Promise<QueryResponse>;
}
//# sourceMappingURL=manager-dashboard.controller.d.ts.map