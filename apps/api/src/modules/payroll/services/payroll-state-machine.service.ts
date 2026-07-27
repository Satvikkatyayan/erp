import { Injectable, BadRequestException } from '@nestjs/common';
import { PayPayrollRunRepository } from '../repositories/payroll-run.repository';

export enum PayrollRunStatus {
  DRAFT = 'DRAFT',
  COLLECTING = 'COLLECTING',
  CALCULATING = 'CALCULATING',
  APPROVED = 'APPROVED',
  LOCKED = 'LOCKED',
  PROCESSED = 'PROCESSED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED'
}

@Injectable()
export class PayrollStateMachineService {
  constructor(private readonly payrollRunRepo: PayPayrollRunRepository) {}

  private validateTransition(current: string, target: string) {
    const transitions: Record<string, string[]> = {
      [PayrollRunStatus.DRAFT]: [PayrollRunStatus.COLLECTING, PayrollRunStatus.CANCELLED],
      [PayrollRunStatus.COLLECTING]: [PayrollRunStatus.CALCULATING, PayrollRunStatus.DRAFT, PayrollRunStatus.CANCELLED],
      [PayrollRunStatus.CALCULATING]: [PayrollRunStatus.APPROVED, PayrollRunStatus.REJECTED, PayrollRunStatus.CANCELLED],
      [PayrollRunStatus.APPROVED]: [PayrollRunStatus.LOCKED, PayrollRunStatus.REJECTED],
      [PayrollRunStatus.LOCKED]: [PayrollRunStatus.PROCESSED],
      [PayrollRunStatus.REJECTED]: [PayrollRunStatus.DRAFT], // Reopen before processing
      [PayrollRunStatus.CANCELLED]: [],
      [PayrollRunStatus.PROCESSED]: []
    };

    const allowed = transitions[current] || [];
    if (!allowed.includes(target)) {
      throw new BadRequestException(`Invalid payroll run state transition from ${current} to ${target}`);
    }
  }

  async transition(runId: string, targetStatus: PayrollRunStatus, tx?: any): Promise<void> {
    const run = await this.payrollRunRepo.findById(runId, tx);
    if (!run) throw new BadRequestException('Payroll run not found');

    this.validateTransition(run.status || PayrollRunStatus.DRAFT, targetStatus);

    await this.payrollRunRepo.save({ id: runId, status: targetStatus }, tx);
  }
}
