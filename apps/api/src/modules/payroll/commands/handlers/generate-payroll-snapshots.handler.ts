import { Injectable } from '@nestjs/common';
import { GeneratePayrollSnapshotsCommand } from '../generate-payroll-snapshots.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';

@Injectable()
export class GeneratePayrollSnapshotsHandler {
  constructor(private readonly executionService: PayrollExecutionService) {}

  async execute(command: GeneratePayrollSnapshotsCommand): Promise<void> {
    await this.executionService.generatePayrollSnapshots(command.ctx, command.runId);
  }
}
