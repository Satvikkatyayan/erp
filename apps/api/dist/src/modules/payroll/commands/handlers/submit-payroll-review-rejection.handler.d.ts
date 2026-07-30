import { SubmitPayrollReviewRejectionCommand } from '../submit-payroll-review-rejection.command';
import { PayrollExecutionService } from '../../services/payroll-execution.service';
export declare class SubmitPayrollReviewRejectionHandler {
    private readonly executionService;
    constructor(executionService: PayrollExecutionService);
    execute(command: SubmitPayrollReviewRejectionCommand): Promise<void>;
}
//# sourceMappingURL=submit-payroll-review-rejection.handler.d.ts.map