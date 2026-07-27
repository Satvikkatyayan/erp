import { Injectable } from '@nestjs/common';
import { CreatePayrollRunCommand } from '../create-payroll-run.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class CreatePayrollRunHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: CreatePayrollRunCommand): Promise<string> {
    return this.executionService.createPayrollRun(command.ctx, command.periodId, command.runType);
  }
}
