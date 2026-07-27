import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ICorporateCardRepository } from '../interfaces/repository.interfaces';
export declare class CorporateCardService {
    private readonly context;
    private readonly cardRepo;
    constructor(context: ExpenseDomainContext, cardRepo: ICorporateCardRepository);
    assignCard(employeeId: string, cardData: any): Promise<any>;
    importStatement(statementData: any): Promise<any>;
    importTransactions(statementId: string, transactions: any[]): Promise<any>;
    matchExpense(transactionId: string, potentialExpenseIds: string[]): Promise<any>;
    reconcileTransaction(transactionId: string, expenseItemId: string): Promise<any>;
}
//# sourceMappingURL=corporate-card.service.d.ts.map