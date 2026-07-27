import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRepository } from '../interfaces/repository.interfaces';
export declare class ExpenseClaimService {
    private readonly context;
    private readonly expenseRepo;
    constructor(context: ExpenseDomainContext, expenseRepo: IExpenseRepository);
    createDraft(payload: any): Promise<any>;
    updateDraft(claimId: string, payload: any): Promise<any>;
    addExpenseItem(claimId: string, itemData: any): Promise<any>;
    removeExpenseItem(claimId: string, itemId: string): Promise<any>;
    attachReceipt(itemId: string, receiptId: string): Promise<any>;
    calculateTotals(claimId: string): number;
    submitDraft(claimId: string): Promise<any>;
    cancelDraft(claimId: string): Promise<any>;
    lockClaim(claimId: string): Promise<any>;
}
//# sourceMappingURL=expense-claim.service.d.ts.map