import { Injectable } from '@nestjs/common';
import { ApprovePayrollCommand } from '../approve-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class ApprovePayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: ApprovePayrollCommand): Promise<void> {
    await this.executionService.approvePayrollRun(command.ctx, command.runId);
  }
}
