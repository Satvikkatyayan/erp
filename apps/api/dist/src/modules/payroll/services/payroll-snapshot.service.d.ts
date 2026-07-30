import { PayPayrollSnapshotRepository } from '../repositories/payroll-snapshot.repository';
export declare class PayrollSnapshotService {
    private readonly snapshotRepo;
    constructor(snapshotRepo: PayPayrollSnapshotRepository);
    generateSnapshot(tenantId: string, runId: string, employeeId: string, salaryAssignment: any, attendanceSummary: any, salaryStructureVersion: string, rulesVersion: string, payrollPeriod: any, tx?: any): Promise<string>;
}
//# sourceMappingURL=payroll-snapshot.service.d.ts.map