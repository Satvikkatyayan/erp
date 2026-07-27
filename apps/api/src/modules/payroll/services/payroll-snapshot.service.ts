import { Injectable } from '@nestjs/common';
import { PayPayrollSnapshotRepository } from '../repositories/payroll-snapshot.repository';
import { createHash } from 'crypto';

@Injectable()
export class PayrollSnapshotService {
  constructor(private readonly snapshotRepo: PayPayrollSnapshotRepository) {}

  async generateSnapshot(
    tenantId: string,
    runId: string,
    employeeId: string,
    salaryAssignment: any,
    attendanceSummary: any,
    salaryStructureVersion: string,
    rulesVersion: string,
    payrollPeriod: any,
    tx?: any
  ): Promise<string> {
    
    const snapshotData = {
      salaryAssignment,
      salaryStructureVersion,
      rulesVersion,
      attendanceSummaryVersion: attendanceSummary.version,
      attendanceSummary,
      payrollPeriod,
      sourceVersions: {
        attendance: attendanceSummary.version,
        rules: rulesVersion,
        structure: salaryStructureVersion
      }
    };

    const checksumSource = JSON.stringify(snapshotData);
    const checksum = createHash('sha256').update(checksumSource).digest('hex');

    const result = await this.snapshotRepo.save({
      tenantId,
      payrollRunId: runId,
      employeeId,
      snapshotData,
      checksum,
      generatedAt: new Date()
    }, tx);

    return result.id;
  }
}
