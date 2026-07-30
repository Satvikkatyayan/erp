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
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollReviewService = void 0;
const common_1 = require("@nestjs/common");
const payroll_review_repository_1 = require("../repositories/payroll-review.repository");
const payroll_timeline_repository_1 = require("../repositories/payroll-timeline.repository");
const payroll_workflow_repository_1 = require("../repositories/payroll-workflow.repository");
const payroll_run_workflow_snapshot_repository_1 = require("../repositories/payroll-run-workflow-snapshot.repository");
let PayrollReviewService = class PayrollReviewService {
    constructor(reviewRepo, timelineRepo, workflowRepo, snapshotRepo) {
        this.reviewRepo = reviewRepo;
        this.timelineRepo = timelineRepo;
        this.workflowRepo = workflowRepo;
        this.snapshotRepo = snapshotRepo;
    }
    async initializeWorkflow(ctx, runId, version = 1, tx) {
        const activeWorkflow = await this.workflowRepo.findActiveWorkflow(ctx.tenantId, tx);
        if (!activeWorkflow || activeWorkflow.steps.length === 0) {
            throw new common_1.BadRequestException('No active payroll review workflow found.');
        }
        await this.snapshotRepo.save({
            tenantId: ctx.tenantId,
            payrollRunId: runId,
            workflowId: activeWorkflow.id,
            workflowVersion: activeWorkflow.version,
            snapshotData: activeWorkflow
        }, tx);
        for (const step of activeWorkflow.steps) {
            await this.reviewRepo.save({
                tenantId: ctx.tenantId,
                payrollRunId: runId,
                stepNumber: step.stepNumber,
                roleCode: step.roleCode,
                roleDisplayName: step.roleDisplayName,
                status: 'PENDING',
                version
            }, tx);
        }
    }
    async getWorkflowSnapshot(runId, tx) {
        const snapshot = await this.snapshotRepo.findByRunId(runId, tx);
        if (!snapshot)
            throw new common_1.BadRequestException('Workflow snapshot not found for run');
        return snapshot.snapshotData;
    }
    async getCurrentStep(runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        const pending = reviews.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS');
        return pending.length > 0 ? pending[0] : null;
    }
    async getNextStep(runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        const pending = reviews.filter(r => r.status === 'PENDING');
        return pending.length > 1 ? pending[1] : null;
    }
    async getPendingSteps(runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        return reviews.filter(r => r.status === 'PENDING');
    }
    async getCompletedSteps(runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        return reviews.filter(r => r.status === 'APPROVED');
    }
    async approveStep(ctx, reviewId, remarks, tx) {
        const review = await this.reviewRepo.findById(reviewId, tx);
        if (!review)
            throw new common_1.BadRequestException('Review not found');
        const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
        const stepConfig = workflow.steps.find((s) => s.stepNumber === review.stepNumber);
        if (!stepConfig)
            throw new common_1.BadRequestException('Step configuration not found');
        if (!stepConfig.canApprove) {
            throw new common_1.BadRequestException('This step cannot be approved');
        }
        const reviews = await this.reviewRepo.findByRunId(review.payrollRunId, tx);
        const previousSteps = workflow.steps.filter((s) => s.stepNumber < review.stepNumber);
        for (const prevStep of previousSteps) {
            if (prevStep.required) {
                const prevReviews = reviews.filter(r => r.stepNumber === prevStep.stepNumber);
                const approvedCount = prevReviews.filter(r => r.status === 'APPROVED').length;
                if (approvedCount < (prevStep.minimumApprovals || 1)) {
                    throw new common_1.BadRequestException(`Cannot approve: step ${prevStep.stepNumber} (${prevStep.roleDisplayName}) is required and not fully approved.`);
                }
            }
        }
        return this.reviewRepo.save({
            id: reviewId,
            status: 'APPROVED',
            remarks,
            reviewedAt: new Date(),
            reviewerId: ctx.userId
        }, tx);
    }
    async rejectStep(ctx, reviewId, remarks, tx) {
        const review = await this.reviewRepo.findById(reviewId, tx);
        if (!review)
            throw new common_1.BadRequestException('Review not found');
        const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
        const stepConfig = workflow.steps.find((s) => s.stepNumber === review.stepNumber);
        if (stepConfig && !stepConfig.canReject) {
            throw new common_1.BadRequestException('This step cannot be rejected');
        }
        return this.reviewRepo.save({
            id: reviewId,
            status: 'REJECTED',
            remarks,
            reviewedAt: new Date(),
            reviewerId: ctx.userId
        }, tx);
    }
    async returnStep(ctx, reviewId, remarks, tx) {
        const review = await this.reviewRepo.findById(reviewId, tx);
        if (!review)
            throw new common_1.BadRequestException('Review not found');
        const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
        const stepConfig = workflow.steps.find((s) => s.stepNumber === review.stepNumber);
        if (stepConfig && !stepConfig.canReturn) {
            throw new common_1.BadRequestException('This step cannot be returned');
        }
        return this.reviewRepo.save({
            id: reviewId,
            status: 'RETURNED',
            remarks,
            reviewedAt: new Date(),
            reviewerId: ctx.userId
        }, tx);
    }
    async isApprovalComplete(runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        if (reviews.length === 0)
            return false;
        const workflow = await this.getWorkflowSnapshot(runId, tx);
        for (const stepConfig of workflow.steps) {
            if (stepConfig.required) {
                const stepReviews = reviews.filter(r => r.stepNumber === stepConfig.stepNumber);
                const approvedCount = stepReviews.filter(r => r.status === 'APPROVED').length;
                if (approvedCount < (stepConfig.minimumApprovals || 1)) {
                    return false;
                }
            }
        }
        return true;
    }
    async isEligibleForLock(runId, tx) {
        return this.isApprovalComplete(runId, tx);
    }
    async isEligibleForProcess(runId, tx) {
        return this.isApprovalComplete(runId, tx);
    }
    async restartWorkflow(ctx, runId, tx) {
        const reviews = await this.reviewRepo.findByRunId(runId, tx);
        const newVersion = reviews.length > 0 ? reviews[reviews.length - 1].version + 1 : 1;
        await this.initializeWorkflow(ctx, runId, newVersion, tx);
    }
    async cancelWorkflow(ctx, runId, tx) {
        const pending = await this.getPendingSteps(runId, tx);
        for (const review of pending) {
            await this.reviewRepo.save({
                id: review.id,
                status: 'CANCELLED'
            }, tx);
        }
    }
    async recordTimeline(ctx, runId, action, reason, previousState, currentState, version = 1, tx) {
        await this.timelineRepo.save({
            tenantId: ctx.tenantId,
            payrollRunId: runId,
            actor: ctx.userId,
            action,
            reason,
            previousState,
            currentState,
            version
        }, tx);
    }
};
exports.PayrollReviewService = PayrollReviewService;
exports.PayrollReviewService = PayrollReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payroll_review_repository_1.PayPayrollReviewRepository,
        payroll_timeline_repository_1.PayPayrollTimelineRepository,
        payroll_workflow_repository_1.PayPayrollWorkflowRepository,
        payroll_run_workflow_snapshot_repository_1.PayPayrollRunWorkflowSnapshotRepository])
], PayrollReviewService);
//# sourceMappingURL=payroll-review.service.js.map