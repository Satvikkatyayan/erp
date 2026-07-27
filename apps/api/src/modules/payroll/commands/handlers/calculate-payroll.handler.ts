import { Injectable } from '@nestjs/common';
import { CalculatePayrollCommand } from '../calculate-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class CalculatePayrollHandler  {
  constructor(
    private readonly executionService: PayrollExecutionService
  ) {}

  async execute(command: CalculatePayrollCommand): Promise<void> {
    const { ctx, runId, currencyId } = command;

    // The PayrollExecutionService handles its own inner transactions per employee
    // as well as the transition to CALCULATING and APPROVED.
    await this.executionService.executePayrollRun(ctx, runId, currencyId);
  }
}
