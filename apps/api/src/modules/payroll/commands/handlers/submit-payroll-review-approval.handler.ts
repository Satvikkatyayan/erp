import { Injectable } from '@nestjs/common';
import { SubmitPayrollReviewApprovalCommand } from '../submit-payroll-review-approval.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class SubmitPayrollReviewApprovalHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: SubmitPayrollReviewApprovalCommand): Promise<void> {
    await this.executionService.submitReviewApproval(command.ctx, command.runId, command.reviewId, command.remarks);
  }
}
