import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { PagedResponse } from '../dto/responses/standard.response';
export declare class CorporateCardQueryController {
    private readonly readFacade;
    constructor(readFacade: ExpenseReadFacade);
    getAssignedCards(): Promise<PagedResponse>;
    getTransactions(cardId: string): Promise<PagedResponse>;
    getOutstandingReconciliation(cardId: string): Promise<PagedResponse>;
}
//# sourceMappingURL=corporate-card-query.controller.d.ts.map