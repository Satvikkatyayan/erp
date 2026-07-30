import { ApprovePayrollCommand } from '../approve-payroll.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class ApprovePayrollHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: ApprovePayrollCommand): Promise<void>;
}
//# sourceMappingURL=approve-payroll.handler.d.ts.map