import { Injectable } from '@nestjs/common';
import { StartPayrollCollectionCommand } from '../start-payroll-collection.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class StartPayrollCollectionHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: StartPayrollCollectionCommand): Promise<void> {
    await this.executionService.startPayrollCollection(command.ctx, command.runId);
  }
}
