import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';
import { IExpenseRiskAssessmentResult } from '../types/expense.types';
import { EXPENSE_CONSTANTS } from '../constants/expense.constants';

@Injectable()
export class ExpenseRiskEngine {
  constructor(private readonly context: ExpenseDomainContext) {}

  calculateRiskScore(claimData: any): IExpenseRiskAssessmentResult {
    const ctx = this.context.getContext();
    const flags = [];
    let score = 0;
    
    if (claimData.hasDuplicateReceipt) {
      score += EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT;
      flags.push({ rule: 'Duplicate Receipt', weight: EXPENSE_CONSTANTS.DUPLICATE_RECEIPT_WEIGHT });
    }

    return { score, flags };
  }
}
