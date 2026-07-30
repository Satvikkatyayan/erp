import { Injectable } from '@nestjs/common';
import { LeaveRequestRepository } from '../repositories/leave-request.repository';
import { LeaveBalanceRepository } from '../repositories/leave-balance.repository';
import { LeavePolicyRepository } from '../repositories/leave-policy.repository';
import { LeaveTimelineRepository } from '../repositories/timeline.repository';
import { LeaveSnapshotRepository } from '../repositories/snapshot.repository';

@Injectable()
export class LeaveQueryService {
  constructor(
    private readonly leaveRequestRepo: LeaveRequestRepository,
    private readonly leaveBalanceRepo: LeaveBalanceRepository,
    private readonly leavePolicyRepo: LeavePolicyRepository,
    private readonly timelineRepo: LeaveTimelineRepository,
    private readonly snapshotRepo: LeaveSnapshotRepository
  ) {}

  async getLeaveRequest(tenantId: string, id: string): Promise<any> {
    return this.leaveRequestRepo.findLeaveRequestById(tenantId, id);
  }

  async searchLeaveRequests(tenantId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.leaveRequestRepo.searchLeaveRequests(tenantId, filters, sort);
  }

  async getLeaveBalances(tenantId: string, employeeId: string): Promise<any[]> {
    return this.leaveBalanceRepo.findEmployeeLeaveBalance(tenantId, employeeId);
  }

  async getLeaveTimeline(tenantId: string, leaveRequestId: string): Promise<any[]> {
    return this.timelineRepo.getTimeline(tenantId, leaveRequestId);
  }

  async getLeaveSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<any[]> {
    return this.snapshotRepo.getSnapshotHistory(tenantId, leaveRequestId);
  }

  async getLeavePolicies(tenantId: string, filters?: any, sort?: any): Promise<any[]> {
    return this.leavePolicyRepo.listLeavePolicies(tenantId, filters, sort);
  }
}
