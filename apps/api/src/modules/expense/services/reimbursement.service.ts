import { Injectable } from '@nestjs/common';
import { ExpenseDomainContext } from '../context/expense-domain.context';

@Injectable()
export class ReimbursementService {
  constructor(private readonly context: ExpenseDomainContext) {}

  async prepareReimbursementPayload(claimId: string): Promise<any> {
    return { status: 'PAYLOAD_PREPARED', claimId };
  }

  async coordinatePayrollSdk(payload: any): Promise<any> {
    // Only coordinates SDK, doesn't execute payment directly
    return { status: 'PAYROLL_NOTIFIED' };
  }

  async updateReimbursementStatus(claimId: string, status: string): Promise<any> {
    return { status: 'STATUS_UPDATED', claimId };
  }

  async retryFailedReimbursement(claimId: string): Promise<any> {
    return { status: 'RETRIED', claimId };
  }

  async executeFinalSettlement(claimId: string): Promise<any> {
    return { status: 'SETTLED', claimId };
  }
}
