import { LeaveQueryService } from '../services/leave-query.service';
import { LeaveRequestDto, LeaveBalanceDto, LeavePolicyDto, LeaveTimelineEntryDto, LeaveSnapshotDto } from './dtos/leave-sdk.dto';
export declare class PlatformLeaveSDK {
    private readonly queryService;
    constructor(queryService: LeaveQueryService);
    getLeaveRequest(tenantId: string, id: string): Promise<LeaveRequestDto | null>;
    searchLeaveRequests(tenantId: string, filters?: any, sort?: any): Promise<LeaveRequestDto[]>;
    getLeaveBalances(tenantId: string, employeeId: string): Promise<LeaveBalanceDto[]>;
    getLeaveTimeline(tenantId: string, leaveRequestId: string): Promise<LeaveTimelineEntryDto[]>;
    getLeaveSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<LeaveSnapshotDto[]>;
    getLeavePolicies(tenantId: string, filters?: any, sort?: any): Promise<LeavePolicyDto[]>;
}
//# sourceMappingURL=platform-leave.sdk.d.ts.map