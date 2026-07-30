import { PayPayrollRunRepository } from '../repositories/payroll-run.repository';
export declare enum PayrollRunStatus {
    DRAFT = "DRAFT",
    COLLECTING = "COLLECTING",
    CALCULATING = "CALCULATING",
    APPROVED = "APPROVED",
    LOCKED = "LOCKED",
    PROCESSED = "PROCESSED",
    REJECTED = "REJECTED",
    CANCELLED = "CANCELLED"
}
export declare class PayrollStateMachineService {
    private readonly payrollRunRepo;
    constructor(payrollRunRepo: PayPayrollRunRepository);
    private validateTransition;
    transition(runId: string, targetStatus: PayrollRunStatus, tx?: any): Promise<void>;
}
//# sourceMappingURL=payroll-state-machine.service.d.ts.map