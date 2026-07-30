import { SubmitPayrollReviewApprovalCommand } from '../submit-payroll-review-approval.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class SubmitPayrollReviewApprovalHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: SubmitPayrollReviewApprovalCommand): Promise<void>;
}
//# sourceMappingURL=submit-payroll-review-approval.handler.d.ts.map