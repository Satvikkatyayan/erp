import { PayPayrollReviewRepository } from '../repositories/payroll-review.repository';
import { PayPayrollTimelineRepository } from '../repositories/payroll-timeline.repository';
import { PayPayrollWorkflowRepository } from '../repositories/payroll-workflow.repository';
import { PayPayrollRunWorkflowSnapshotRepository } from '../repositories/payroll-run-workflow-snapshot.repository';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class PayrollReviewService {
    private readonly reviewRepo;
    private readonly timelineRepo;
    private readonly workflowRepo;
    private readonly snapshotRepo;
    constructor(reviewRepo: PayPayrollReviewRepository, timelineRepo: PayPayrollTimelineRepository, workflowRepo: PayPayrollWorkflowRepository, snapshotRepo: PayPayrollRunWorkflowSnapshotRepository);
    initializeWorkflow(ctx: PlatformContext, runId: string, version?: number, tx?: any): Promise<void>;
    getWorkflowSnapshot(runId: string, tx?: any): Promise<any>;
    getCurrentStep(runId: string, tx?: any): Promise<any>;
    getNextStep(runId: string, tx?: any): Promise<any>;
    getPendingSteps(runId: string, tx?: any): Promise<any[]>;
    getCompletedSteps(runId: string, tx?: any): Promise<any[]>;
    approveStep(ctx: PlatformContext, reviewId: string, remarks?: string, tx?: any): Promise<any>;
    rejectStep(ctx: PlatformContext, reviewId: string, remarks: string, tx?: any): Promise<any>;
    returnStep(ctx: PlatformContext, reviewId: string, remarks: string, tx?: any): Promise<any>;
    isApprovalComplete(runId: string, tx?: any): Promise<boolean>;
    isEligibleForLock(runId: string, tx?: any): Promise<boolean>;
    isEligibleForProcess(runId: string, tx?: any): Promise<boolean>;
    restartWorkflow(ctx: PlatformContext, runId: string, tx?: any): Promise<void>;
    cancelWorkflow(ctx: PlatformContext, runId: string, tx?: any): Promise<void>;
    recordTimeline(ctx: PlatformContext, runId: string, action: string, reason?: string, previousState?: string, currentState?: string, version?: number, tx?: any): Promise<void>;
}
//# sourceMappingURL=payroll-review.service.d.ts.map