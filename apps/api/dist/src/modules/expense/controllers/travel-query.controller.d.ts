import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
export declare class TravelQueryController {
    private readonly readFacade;
    constructor(readFacade: ExpenseReadFacade);
    getTravelHistory(params: any): Promise<PagedResponse>;
    getActiveTravel(params: any): Promise<PagedResponse>;
    getTravelDashboard(): Promise<QueryResponse>;
}
//# sourceMappingURL=travel-query.controller.d.ts.map