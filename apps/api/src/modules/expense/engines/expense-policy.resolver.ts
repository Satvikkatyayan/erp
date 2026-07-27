import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ExpensePolicyResolver {
  constructor(private readonly context: ExpenseDomainContext) {}

  resolvePolicies(): boolean {
    const ctx = this.context.getContext();
    return true; // Mock true for now
  }
}
