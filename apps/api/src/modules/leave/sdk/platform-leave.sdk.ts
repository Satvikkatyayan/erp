import { Injectable } from '@nestjs/common';
import { LeaveQueryService } from '../services/leave-query.service';
import { LeaveRequestDto, LeaveBalanceDto, LeavePolicyDto, LeaveTimelineEntryDto, LeaveSnapshotDto } from './dtos/leave-sdk.dto';

@Injectable()
export class PlatformLeaveSDK {
  constructor(private readonly queryService: LeaveQueryService) {}

  // READ Operations
  async getLeaveRequest(tenantId: string, id: string): Promise<LeaveRequestDto | null> {
    const raw = await this.queryService.getLeaveRequest(tenantId, id);
    if (!raw) return null;
    return {
      id: raw.id,
      tenantId: raw.tenantId,
      employeeId: raw.employeeId,
      leaveNumber: raw.leaveNumber,
      status: raw.status,
      startDate: raw.startDate,
      endDate: raw.endDate,
      typeId: raw.typeId,
      reason: raw.reason
    };
  }

  async searchLeaveRequests(tenantId: string, filters?: any, sort?: any): Promise<LeaveRequestDto[]> {
    const rawList = await this.queryService.searchLeaveRequests(tenantId, filters, sort);
    return rawList.map(raw => ({
      id: raw.id,
      tenantId: raw.tenantId,
      employeeId: raw.employeeId,
      leaveNumber: raw.leaveNumber,
      status: raw.status,
      startDate: raw.startDate,
      endDate: raw.endDate,
      typeId: raw.typeId,
      reason: raw.reason
    }));
  }

  async getLeaveBalances(tenantId: string, employeeId: string): Promise<LeaveBalanceDto[]> {
    const rawList = await this.queryService.getLeaveBalances(tenantId, employeeId);
    return rawList.map(raw => ({
      id: raw.id,
      tenantId: raw.tenantId,
      employeeId: raw.employeeId,
      leaveTypeId: raw.leaveTypeId,
      allocated: raw.allocated,
      used: raw.used,
      available: raw.available
    }));
  }

  async getLeaveTimeline(tenantId: string, leaveRequestId: string): Promise<LeaveTimelineEntryDto[]> {
    const rawList = await this.queryService.getLeaveTimeline(tenantId, leaveRequestId);
    return rawList.map(raw => ({
      id: raw.id,
      eventType: raw.transactionType || raw.eventType,
      eventDate: raw.createdAt || raw.eventDate,
      metadata: raw.metadata
    }));
  }

  async getLeaveSnapshotHistory(tenantId: string, leaveRequestId: string): Promise<LeaveSnapshotDto[]> {
    const rawList = await this.queryService.getLeaveSnapshotHistory(tenantId, leaveRequestId);
    return rawList.map(raw => ({
      id: raw.id,
      leaveRequestId: raw.leaveRequestId,
      payload: raw.payload,
      generatedAt: raw.generatedAt
    }));
  }

  async getLeavePolicies(tenantId: string, filters?: any, sort?: any): Promise<LeavePolicyDto[]> {
    const rawList = await this.queryService.getLeavePolicies(tenantId, filters, sort);
    return rawList.map(raw => ({
      id: raw.id,
      tenantId: raw.tenantId,
      name: raw.name,
      description: raw.description
    }));
  }
}
