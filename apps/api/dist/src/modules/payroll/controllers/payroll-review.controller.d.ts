import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ApiResponseDto } from '../dtos/shared/api-response.dto';
import { PayrollMapper } from '../dtos/mapping/payroll.mapper';
import { SubmitPayrollReviewApprovalDto } from '../dtos/commands/submit-payroll-review-approval.dto';
import { SubmitPayrollReviewRejectionDto } from '../dtos/commands/submit-payroll-review-rejection.dto';
import { SubmitPayrollReviewApprovalHandler } from '../commands/handlers/submit-payroll-review-approval.handler';
import { SubmitPayrollReviewRejectionHandler } from '../commands/handlers/submit-payroll-review-rejection.handler';
export declare class PayrollReviewController {
    private readonly submitPayrollReviewApprovalHandler;
    private readonly submitPayrollReviewRejectionHandler;
    private readonly mapper;
    private readonly logger;
    constructor(submitPayrollReviewApprovalHandler: SubmitPayrollReviewApprovalHandler, submitPayrollReviewRejectionHandler: SubmitPayrollReviewRejectionHandler, mapper: PayrollMapper);
    private wrapResponse;
    approveReview(reviewId: string, dto: SubmitPayrollReviewApprovalDto, ctx: PlatformContext): Promise<ApiResponseDto<void>>;
    rejectReview(reviewId: string, dto: SubmitPayrollReviewRejectionDto, ctx: PlatformContext): Promise<ApiResponseDto<void>>;
}
//# sourceMappingURL=payroll-review.controller.d.ts.map