import { Injectable } from '@nestjs/common';
import { RegenerateEmployeePayrollCommand } from '../regenerate-employee-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class RegenerateEmployeePayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: RegenerateEmployeePayrollCommand): Promise<void> {
    await this.executionService.regenerateEmployeePayroll(command.ctx, command.runId, command.employeeId, command.currencyId);
  }
}
