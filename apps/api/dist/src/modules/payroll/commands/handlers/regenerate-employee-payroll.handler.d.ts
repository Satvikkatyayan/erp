import { RegenerateEmployeePayrollCommand } from '../regenerate-employee-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class RegenerateEmployeePayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: RegenerateEmployeePayrollCommand): Promise<void>;
}
//# sourceMappingURL=regenerate-employee-payroll.handler.d.ts.map