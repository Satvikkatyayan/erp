import { Injectable } from '@nestjs/common';
import { ReopenPayrollCommand } from '../reopen-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class ReopenPayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: ReopenPayrollCommand): Promise<void> {
    await this.executionService.reopenPayrollRun(command.ctx, command.runId);
  }
}
