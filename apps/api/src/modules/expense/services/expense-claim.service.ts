import { Injectable, Inject } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRepository, EXPENSE_REPOSITORY_TOKEN } from '../interfaces/repository.interfaces';

@Injectable()
export class ExpenseClaimService {
  constructor(
    private readonly context: ExpenseDomainContext,
    @Inject(EXPENSE_REPOSITORY_TOKEN) private readonly expenseRepo: IExpenseRepository
  ) {}

  async createDraft(payload: any): Promise<any> {
    const ctx = this.context.getContext();
    await this.expenseRepo.createDraft(payload);
    return { status: 'DRAFT_CREATED', employeeId: ctx.employee.id };
  }

  async updateDraft(claimId: string, payload: any): Promise<any> {
    await this.expenseRepo.update(claimId, payload);
    return { status: 'DRAFT_UPDATED', claimId };
  }

  async addExpenseItem(claimId: string, itemData: any): Promise<any> {
    return { status: 'ITEM_ADDED', claimId };
  }

  async removeExpenseItem(claimId: string, itemId: string): Promise<any> {
    return { status: 'ITEM_REMOVED', itemId };
  }

  async attachReceipt(itemId: string, receiptId: string): Promise<any> {
    return { status: 'RECEIPT_ATTACHED', itemId, receiptId };
  }

  calculateTotals(claimId: string): number {
    return 0; // Totals based on baseCurrency from currencyContext
  }

  async submitDraft(claimId: string): Promise<any> {
    return { status: 'SUBMITTED', claimId };
  }

  async cancelDraft(claimId: string): Promise<any> {
    return { status: 'CANCELLED', claimId };
  }

  async lockClaim(claimId: string): Promise<any> {
    return { status: 'LOCKED', claimId };
  }
}
