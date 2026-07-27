export const EXPENSE_REPOSITORY_TOKEN = 'IExpenseRepository';
export const RECEIPT_REPOSITORY_TOKEN = 'IReceiptRepository';
export const TRAVEL_REPOSITORY_TOKEN = 'ITravelRepository';
export const CORPORATE_CARD_REPOSITORY_TOKEN = 'ICorporateCardRepository';
export const BUDGET_REPOSITORY_TOKEN = 'IBudgetRepository';

export interface IExpenseRepository {
  createDraft(payload: any): Promise<any>;
  update(claimId: string, payload: any): Promise<any>;
  findById(claimId: string): Promise<any>;
}

export interface IReceiptRepository {
  saveMetadata(itemId: string, metadata: any): Promise<any>;
  findByFingerprint(fingerprint: string): Promise<any>;
  delete(receiptId: string): Promise<any>;
}

export interface ITravelRepository {
  createRequest(payload: any): Promise<any>;
  update(travelId: string, payload: any): Promise<any>;
}

export interface ICorporateCardRepository {
  importStatement(statementData: any): Promise<any>;
  saveTransactions(statementId: string, transactions: any[]): Promise<any>;
}

export interface IBudgetRepository {
  getAvailableBudget(budgetId: string): Promise<number>;
  reserveBudget(budgetId: string, amount: number): Promise<any>;
}
