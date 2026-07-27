import { Injectable } from '@nestjs/common';
import { IExpenseDomainContextData } from '../types/expense.types';

@Injectable()
export class ExpenseDomainContext {
  private currentContext: IExpenseDomainContextData | null = null;

  setContext(data: IExpenseDomainContextData): void {
    this.currentContext = Object.freeze({ ...data }); // Immutable for one operation
  }

  getContext(): IExpenseDomainContextData {
    if (!this.currentContext) {
      throw new Error('ExpenseDomainContext is not initialized.');
    }
    return this.currentContext;
  }
}
