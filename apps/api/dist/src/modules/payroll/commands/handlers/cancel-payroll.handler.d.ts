import { CancelPayrollCommand } from '../cancel-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class CancelPayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: CancelPayrollCommand): Promise<void>;
}
//# sourceMappingURL=cancel-payroll.handler.d.ts.map