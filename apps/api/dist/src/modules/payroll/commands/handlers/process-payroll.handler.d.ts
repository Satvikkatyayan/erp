import { ProcessPayrollCommand } from '../process-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class ProcessPayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: ProcessPayrollCommand): Promise<void>;
}
//# sourceMappingURL=process-payroll.handler.d.ts.map