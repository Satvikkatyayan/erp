import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { ICorporateCardRepository, CORPORATE_CARD_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class CorporateCardService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(CORPORATE_CARD_REPOSITORY_TOKEN) private readonly cardRepo: ICorporateCardRepository
  ) {}

  async assignCard(employeeId: string, cardData: any): Promise<any> {
    return { status: 'CARD_ASSIGNED', employeeId };
  }

  async importStatement(statementData: any): Promise<any> {
    await this.cardRepo.importStatement(statementData);
    return { status: 'STATEMENT_IMPORTED' };
  }

  async importTransactions(statementId: string, transactions: any[]): Promise<any> {
    await this.cardRepo.saveTransactions(statementId, transactions);
    return { status: 'TRANSACTIONS_IMPORTED', statementId };
  }

  async matchExpense(transactionId: string, potentialExpenseIds: string[]): Promise<any> {
    return { status: 'EXPENSES_MATCHED', transactionId };
  }

  async reconcileTransaction(transactionId: string, expenseItemId: string): Promise<any> {
    return { status: 'RECONCILED', transactionId, expenseItemId };
  }
}
