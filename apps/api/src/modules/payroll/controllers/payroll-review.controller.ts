import { Controller, Post, Param, Body, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { RequestContext } from '../../../core/decorators/auth.decorators';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { ApiResponseDto } from '../dtos/shared/api-response.dto';
import { PayrollMapper } from '../dtos/mapping/payroll.mapper';

// DTOs
import { SubmitPayrollReviewApprovalDto } from '../dtos/commands/submit-payroll-review-approval.dto';
import { SubmitPayrollReviewRejectionDto } from '../dtos/commands/submit-payroll-review-rejection.dto';

// Commands
import { SubmitPayrollReviewApprovalCommand } from '../commands/submit-payroll-review-approval.command';
import { SubmitPayrollReviewRejectionCommand } from '../commands/submit-payroll-review-rejection.command';

// Handlers
import { SubmitPayrollReviewApprovalHandler } from '../commands/handlers/submit-payroll-review-approval.handler';
import { SubmitPayrollReviewRejectionHandler } from '../commands/handlers/submit-payroll-review-rejection.handler';

@ApiTags('Payroll Reviews')
@Controller('payroll/reviews')
export class PayrollReviewController {
  private readonly logger = new Logger(PayrollReviewController.name);

  constructor(
    private readonly submitPayrollReviewApprovalHandler: SubmitPayrollReviewApprovalHandler,
    private readonly submitPayrollReviewRejectionHandler: SubmitPayrollReviewRejectionHandler,
    private readonly mapper: PayrollMapper
  ) {}

  private wrapResponse<T>(data: T, requestId: string): ApiResponseDto<T> {
    return {
      success: true,
      message: 'Success',
      data,
      timestamp: new Date().toISOString(),
      requestId,
      version: '1'
    };
  }

  @Post(':reviewId/approve')
  @ApiOperation({ summary: 'Approve payroll review step' })
  @ApiParam({ name: 'reviewId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async approveReview(@Param('reviewId') reviewId: string, @Body() dto: SubmitPayrollReviewApprovalDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.reviewId = reviewId;
    this.logger.log(`Review Approved for ${reviewId}`);
    await this.submitPayrollReviewApprovalHandler.execute(new SubmitPayrollReviewApprovalCommand(ctx, dto.runId, reviewId, dto.remarks));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }

  @Post(':reviewId/reject')
  @ApiOperation({ summary: 'Reject payroll review step' })
  @ApiParam({ name: 'reviewId' })
  @ApiResponse({ status: 200, type: ApiResponseDto })
  async rejectReview(@Param('reviewId') reviewId: string, @Body() dto: SubmitPayrollReviewRejectionDto, @RequestContext() ctx: PlatformContext): Promise<ApiResponseDto<void>> {
    dto.reviewId = reviewId;
    this.logger.log(`Review Rejected for ${reviewId}`);
    await this.submitPayrollReviewRejectionHandler.execute(new SubmitPayrollReviewRejectionCommand(ctx, dto.runId, reviewId, dto.remarks));
    return this.wrapResponse(undefined, ctx?.correlationId || 'none');
  }
}