"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var PayrollReviewController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReviewController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorators_1 = require("../../../core/decorators/auth.decorators");
const api_response_dto_1 = require("../dtos/shared/api-response.dto");
const payroll_mapper_1 = require("../dtos/mapping/payroll.mapper");
const submit_payroll_review_approval_dto_1 = require("../dtos/commands/submit-payroll-review-approval.dto");
const submit_payroll_review_rejection_dto_1 = require("../dtos/commands/submit-payroll-review-rejection.dto");
const submit_payroll_review_approval_command_1 = require("../commands/submit-payroll-review-approval.command");
const submit_payroll_review_rejection_command_1 = require("../commands/submit-payroll-review-rejection.command");
const submit_payroll_review_approval_handler_1 = require("../commands/handlers/submit-payroll-review-approval.handler");
const submit_payroll_review_rejection_handler_1 = require("../commands/handlers/submit-payroll-review-rejection.handler");
let PayrollReviewController = PayrollReviewController_1 = class PayrollReviewController {
    constructor(submitPayrollReviewApprovalHandler, submitPayrollReviewRejectionHandler, mapper) {
        this.submitPayrollReviewApprovalHandler = submitPayrollReviewApprovalHandler;
        this.submitPayrollReviewRejectionHandler = submitPayrollReviewRejectionHandler;
        this.mapper = mapper;
        this.logger = new common_1.Logger(PayrollReviewController_1.name);
    }
    wrapResponse(data, requestId) {
        return {
            success: true,
            message: 'Success',
            data,
            timestamp: new Date().toISOString(),
            requestId,
            version: '1'
        };
    }
    async approveReview(reviewId, dto, ctx) {
        dto.reviewId = reviewId;
        this.logger.log(`Review Approved for ${reviewId}`);
        await this.submitPayrollReviewApprovalHandler.execute(new submit_payroll_review_approval_command_1.SubmitPayrollReviewApprovalCommand(ctx, dto.runId, reviewId, dto.remarks));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async rejectReview(reviewId, dto, ctx) {
        dto.reviewId = reviewId;
        this.logger.log(`Review Rejected for ${reviewId}`);
        await this.submitPayrollReviewRejectionHandler.execute(new submit_payroll_review_rejection_command_1.SubmitPayrollReviewRejectionCommand(ctx, dto.runId, reviewId, dto.remarks));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
};
exports.PayrollReviewController = PayrollReviewController;
__decorate([
    (0, common_1.Post)(':reviewId/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve payroll review step' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_payroll_review_approval_dto_1.SubmitPayrollReviewApprovalDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollReviewController.prototype, "approveReview", null);
__decorate([
    (0, common_1.Post)(':reviewId/reject'),
    (0, swagger_1.ApiOperation)({ summary: 'Reject payroll review step' }),
    (0, swagger_1.ApiParam)({ name: 'reviewId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('reviewId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, submit_payroll_review_rejection_dto_1.SubmitPayrollReviewRejectionDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollReviewController.prototype, "rejectReview", null);
exports.PayrollReviewController = PayrollReviewController = PayrollReviewController_1 = __decorate([
    (0, swagger_1.ApiTags)('Payroll Reviews'),
    (0, common_1.Controller)('payroll/reviews'),
    __metadata("design:paramtypes", [submit_payroll_review_approval_handler_1.SubmitPayrollReviewApprovalHandler,
        submit_payroll_review_rejection_handler_1.SubmitPayrollReviewRejectionHandler,
        payroll_mapper_1.PayrollMapper])
], PayrollReviewController);
//# sourceMappingURL=payroll-review.controller.js.map