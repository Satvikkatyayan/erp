import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class SubmitPayrollReviewApprovalCommand {
    readonly ctx: PlatformContext;
    readonly runId: string;
    readonly reviewId: string;
    readonly remarks?: string;
    constructor(ctx: PlatformContext, runId: string, reviewId: string, remarks?: string);
}
//# sourceMappingURL=submit-payroll-review-approval.command.d.ts.map