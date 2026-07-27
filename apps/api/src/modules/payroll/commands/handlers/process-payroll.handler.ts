import { Injectable } from '@nestjs/common';
import { ProcessPayrollCommand } from '../process-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class ProcessPayrollHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: ProcessPayrollCommand): Promise<void> {
    await this.executionService.processPayrollRun(command.ctx, command.runId);
  }
}
