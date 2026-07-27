import { Injectable, BadRequestException } from '@nestjs/common';
import { PayPayrollReviewRepository } from '../repositories/payroll-review.repository';
import { PayPayrollTimelineRepository } from '../repositories/payroll-timeline.repository';
import { PayPayrollWorkflowRepository } from '../repositories/payroll-workflow.repository';
import { PayPayrollRunWorkflowSnapshotRepository } from '../repositories/payroll-run-workflow-snapshot.repository';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class PayrollReviewService {
  constructor(
    private readonly reviewRepo: PayPayrollReviewRepository,
    private readonly timelineRepo: PayPayrollTimelineRepository,
    private readonly workflowRepo: PayPayrollWorkflowRepository,
    private readonly snapshotRepo: PayPayrollRunWorkflowSnapshotRepository
  ) {}

  async initializeWorkflow(ctx: PlatformContext, runId: string, version: number = 1, tx?: any): Promise<void> {
    const activeWorkflow = await this.workflowRepo.findActiveWorkflow(ctx.tenantId, tx);
    if (!activeWorkflow || activeWorkflow.steps.length === 0) {
      throw new BadRequestException('No active payroll review workflow found.');
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

  async getWorkflowSnapshot(runId: string, tx?: any): Promise<any> {
    const snapshot = await this.snapshotRepo.findByRunId(runId, tx);
    if (!snapshot) throw new BadRequestException('Workflow snapshot not found for run');
    return snapshot.snapshotData;
  }

  async getCurrentStep(runId: string, tx?: any): Promise<any> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    const pending = reviews.filter(r => r.status === 'PENDING' || r.status === 'IN_PROGRESS');
    return pending.length > 0 ? pending[0] : null;
  }

  async getNextStep(runId: string, tx?: any): Promise<any> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    const pending = reviews.filter(r => r.status === 'PENDING');
    return pending.length > 1 ? pending[1] : null;
  }

  async getPendingSteps(runId: string, tx?: any): Promise<any[]> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    return reviews.filter(r => r.status === 'PENDING');
  }

  async getCompletedSteps(runId: string, tx?: any): Promise<any[]> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    return reviews.filter(r => r.status === 'APPROVED');
  }

  async approveStep(ctx: PlatformContext, reviewId: string, remarks?: string, tx?: any): Promise<any> {
    const review = await this.reviewRepo.findById(reviewId, tx);
    if (!review) throw new BadRequestException('Review not found');

    const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
    const stepConfig = workflow.steps.find((s: any) => s.stepNumber === review.stepNumber);
    if (!stepConfig) throw new BadRequestException('Step configuration not found');
    
    if (!stepConfig.canApprove) {
      throw new BadRequestException('This step cannot be approved');
    }

    const reviews = await this.reviewRepo.findByRunId(review.payrollRunId, tx);
    
    // Sequence validation using workflow metadata
    const previousSteps = workflow.steps.filter((s: any) => s.stepNumber < review.stepNumber);
    for (const prevStep of previousSteps) {
      if (prevStep.required) {
        const prevReviews = reviews.filter(r => r.stepNumber === prevStep.stepNumber);
        const approvedCount = prevReviews.filter(r => r.status === 'APPROVED').length;
        if (approvedCount < (prevStep.minimumApprovals || 1)) {
          throw new BadRequestException(`Cannot approve: step ${prevStep.stepNumber} (${prevStep.roleDisplayName}) is required and not fully approved.`);
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

  async rejectStep(ctx: PlatformContext, reviewId: string, remarks: string, tx?: any): Promise<any> {
    const review = await this.reviewRepo.findById(reviewId, tx);
    if (!review) throw new BadRequestException('Review not found');

    const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
    const stepConfig = workflow.steps.find((s: any) => s.stepNumber === review.stepNumber);
    if (stepConfig && !stepConfig.canReject) {
      throw new BadRequestException('This step cannot be rejected');
    }

    return this.reviewRepo.save({
      id: reviewId,
      status: 'REJECTED',
      remarks,
      reviewedAt: new Date(),
      reviewerId: ctx.userId
    }, tx);
  }

  async returnStep(ctx: PlatformContext, reviewId: string, remarks: string, tx?: any): Promise<any> {
    const review = await this.reviewRepo.findById(reviewId, tx);
    if (!review) throw new BadRequestException('Review not found');

    const workflow = await this.getWorkflowSnapshot(review.payrollRunId, tx);
    const stepConfig = workflow.steps.find((s: any) => s.stepNumber === review.stepNumber);
    if (stepConfig && !stepConfig.canReturn) {
      throw new BadRequestException('This step cannot be returned');
    }

    return this.reviewRepo.save({
      id: reviewId,
      status: 'RETURNED',
      remarks,
      reviewedAt: new Date(),
      reviewerId: ctx.userId
    }, tx);
  }

  async isApprovalComplete(runId: string, tx?: any): Promise<boolean> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    if (reviews.length === 0) return false;
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

  async isEligibleForLock(runId: string, tx?: any): Promise<boolean> {
    return this.isApprovalComplete(runId, tx);
  }

  async isEligibleForProcess(runId: string, tx?: any): Promise<boolean> {
    return this.isApprovalComplete(runId, tx);
  }

  async restartWorkflow(ctx: PlatformContext, runId: string, tx?: any): Promise<void> {
    const reviews = await this.reviewRepo.findByRunId(runId, tx);
    const newVersion = reviews.length > 0 ? reviews[reviews.length - 1].version + 1 : 1;
    await this.initializeWorkflow(ctx, runId, newVersion, tx);
  }

  async cancelWorkflow(ctx: PlatformContext, runId: string, tx?: any): Promise<void> {
    const pending = await this.getPendingSteps(runId, tx);
    for (const review of pending) {
      await this.reviewRepo.save({
        id: review.id,
        status: 'CANCELLED'
      }, tx);
    }
  }

  async recordTimeline(
    ctx: PlatformContext, 
    runId: string, 
    action: string, 
    reason?: string, 
    previousState?: string, 
    currentState?: string, 
    version: number = 1,
    tx?: any
  ): Promise<void> {
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
}
