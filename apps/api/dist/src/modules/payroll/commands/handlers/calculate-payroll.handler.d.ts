import { CalculatePayrollCommand } from '../calculate-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class CalculatePayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: CalculatePayrollCommand): Promise<void>;
}
//# sourceMappingURL=calculate-payroll.handler.d.ts.map