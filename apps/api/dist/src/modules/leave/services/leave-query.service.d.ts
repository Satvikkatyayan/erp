import { LeaveRequestRepository } from '../repositories/leave-request.repository';
import { LeaveBalanceRepository } from '../repositories/leave-balance.repository';
import { LeavePolicyRepository } from '../repositories/leave-policy.repository';
import { LeaveTimelineRepository } from '../repositories/timeline.repository';
import { LeaveSnapshotRepository } from '../repositories/snapshot.repository';
export declare class LeaveQueryService {
    private readonly leaveRequestRepo;
    private readonly leaveBalanceRepo;
    private readonly leavePolicyRepo;
    private readonly timelineRepo;
    private readonly snapshotRepo;
    constructor(leaveRequestRepo: LeaveRequestRepository, leaveBalanceRepo: LeaveBalanceRepository, leavePolicyRepo: LeavePolicyRepository, timelineRepo: LeaveTimelineRepository, snapshotRepo: LeaveSnapshotRepository);
    getLeaveRequest(tenantId: string, id: string): Promise<any>;
    searchLeaveRequests(tenantId: string, filters?: any, sort?: any): Promise<any[]>;
    getLeaveBalances(tenantId: string, employeeId: string): Promise<any[]>;
    getLeaveTimeline(tenantId: string, leaveRequestId: string): Promise<any[]>;
    getLeaveSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<any[]>;
    getLeavePolicies(tenantId: string, filters?: any, sort?: any): Promise<any[]>;
}
//# sourceMappingURL=leave-query.service.d.ts.map