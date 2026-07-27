import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ApprovalMatrixEngine {
  constructor(private readonly context: ExpenseDomainContext) {}

  generateApprovalChain(): any[] {
    const ctx = this.context.getContext();
    return [];
  }
}
