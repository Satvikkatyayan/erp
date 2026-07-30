import { LockPayrollCommand } from '../lock-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class LockPayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: LockPayrollCommand): Promise<void>;
}
//# sourceMappingURL=lock-payroll.handler.d.ts.map