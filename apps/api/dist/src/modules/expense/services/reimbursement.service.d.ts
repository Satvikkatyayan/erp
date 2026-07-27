import { ExpenseDomainContext } from '../context/expense-domain.context';
export declare class ReimbursementService {
    private readonly context;
    constructor(context: ExpenseDomainContext);
    prepareReimbursementPayload(claimId: string): Promise<any>;
    coordinatePayrollSdk(payload: any): Promise<any>;
    updateReimbursementStatus(claimId: string, status: string): Promise<any>;
    retryFailedReimbursement(claimId: string): Promise<any>;
    executeFinalSettlement(claimId: string): Promise<any>;
}
//# sourceMappingURL=reimbursement.service.d.ts.map