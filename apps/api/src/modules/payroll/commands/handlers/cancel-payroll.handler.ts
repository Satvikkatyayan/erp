import { Injectable } from '@nestjs/common';
import { CancelPayrollCommand } from '../cancel-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class CancelPayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: CancelPayrollCommand): Promise<void> {
    await this.executionService.cancelPayrollRun(command.ctx, command.runId);
  }
}
