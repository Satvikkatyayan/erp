import { ReopenPayrollCommand } from '../reopen-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class ReopenPayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: ReopenPayrollCommand): Promise<void>;
}
//# sourceMappingURL=reopen-payroll.handler.d.ts.map