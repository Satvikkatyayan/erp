import { ExpenseDomainContext } from '../context/expense-domain.context';
export declare class AdvanceService {
    private readonly context;
    constructor(context: ExpenseDomainContext);
    requestAdvance(payload: any): Promise<any>;
    modifyAdvance(advanceId: string, payload: any): Promise<any>;
    approveAdvancePayload(advanceId: string): Promise<any>;
    recoverAdvance(advanceId: string): Promise<any>;
    calculateSettlement(advanceId: string, expensesTotal: number): number;
}
//# sourceMappingURL=advance.service.d.ts.map