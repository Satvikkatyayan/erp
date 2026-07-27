import { Injectable } from '@nestjs/common';
import { LockPayrollCommand } from '../lock-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class LockPayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: LockPayrollCommand): Promise<void> {
    await this.executionService.lockPayroll(command.ctx, command.runId);
  }
}
