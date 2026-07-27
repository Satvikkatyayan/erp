import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class TravelPolicyResolver {
  constructor(private readonly context: ExpenseDomainContext) {}

  resolveTravelRules(): boolean {
    const ctx = this.context.getContext();
    return true;
  }
}
