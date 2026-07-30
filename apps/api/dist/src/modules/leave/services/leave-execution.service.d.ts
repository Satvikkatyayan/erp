import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { LeaveRequestRepository } from '../repositories/leave-request.repository';
import { LeaveBalanceRepository } from '../repositories/leave-balance.repository';
import { LeavePolicyRepository } from '../repositories/leave-policy.repository';
import { LeaveTimelineRepository } from '../repositories/timeline.repository';
import { LeaveSnapshotRepository } from '../repositories/snapshot.repository';
import { ExecutionResult } from '../../../core/cqrs/execution-result';
import { ApplyLeaveCommand } from '../commands/apply-leave.command';
import { ApproveLeaveCommand } from '../commands/approve-leave.command';
import { RejectLeaveCommand } from '../commands/reject-leave.command';
import { CancelLeaveCommand } from '../commands/cancel-leave.command';
export declare class LeaveExecutionService {
    private readonly prisma;
    private readonly sdk;
    private readonly leaveRequestRepo;
    private readonly leaveBalanceRepo;
    private readonly leavePolicyRepo;
    private readonly timelineRepo;
    private readonly snapshotRepo;
    constructor(prisma: PrismaService, sdk: PlatformSDK, leaveRequestRepo: LeaveRequestRepository, leaveBalanceRepo: LeaveBalanceRepository, leavePolicyRepo: LeavePolicyRepository, timelineRepo: LeaveTimelineRepository, snapshotRepo: LeaveSnapshotRepository);
    applyLeave(command: ApplyLeaveCommand): Promise<ExecutionResult<any>>;
    approveLeave(command: ApproveLeaveCommand): Promise<ExecutionResult<any>>;
    rejectLeave(command: RejectLeaveCommand): Promise<ExecutionResult<any>>;
    cancelLeave(command: CancelLeaveCommand): Promise<ExecutionResult<any>>;
}
//# sourceMappingURL=leave-execution.service.d.ts.map