import { Injectable } from '@nestjs/common';
import { SubmitPayrollReviewRejectionCommand } from '../submit-payroll-review-rejection.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class SubmitPayrollReviewRejectionHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: SubmitPayrollReviewRejectionCommand): Promise<void> {
    await this.executionService.submitReviewRejection(command.ctx, command.runId, command.reviewId, command.remarks);
  }
}
