import { CreatePayrollRunCommand } from '../create-payroll-run.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class CreatePayrollRunHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: CreatePayrollRunCommand): Promise<string>;
}
//# sourceMappingURL=create-payroll-run.handler.d.ts.map