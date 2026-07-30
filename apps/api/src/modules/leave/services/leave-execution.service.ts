import { Injectable } from '@nestjs/common';
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

@Injectable()
export class LeaveExecutionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly leaveRequestRepo: LeaveRequestRepository,
    private readonly leaveBalanceRepo: LeaveBalanceRepository,
    private readonly leavePolicyRepo: LeavePolicyRepository,
    private readonly timelineRepo: LeaveTimelineRepository,
    private readonly snapshotRepo: LeaveSnapshotRepository
  ) {}

  async applyLeave(command: ApplyLeaveCommand): Promise<ExecutionResult<any>> {
    return this.prisma.$transaction(async (tx) => {
      const payload = { ...command.data, status: 'PENDING' };
      const leaveRequest = await this.leaveRequestRepo.createLeaveRequest(command.tenantId, payload, tx);
      const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, leaveRequest.id, 'APPLIED', 'system', command.data, tx);
      const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, leaveRequest.id, { leaveRequest }, tx);
      
      const events: any[] = [];
      return new ExecutionResult({ leaveRequest, timeline, snapshot }, events);
    });
  }

  async approveLeave(command: ApproveLeaveCommand): Promise<ExecutionResult<any>> {
    return this.prisma.$transaction(async (tx) => {
      const id = command.data.leaveRequestId;
      await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'APPROVED' }, tx);
      const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
      
      const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'APPROVED', 'system', command.data, tx);
      const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
      
      const events: any[] = [];
      return new ExecutionResult({ leaveRequest, timeline, snapshot }, events);
    });
  }

  async rejectLeave(command: RejectLeaveCommand): Promise<ExecutionResult<any>> {
    return this.prisma.$transaction(async (tx) => {
      const id = command.data.leaveRequestId;
      await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'REJECTED' }, tx);
      const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
      
      const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'REJECTED', 'system', command.data, tx);
      const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
      
      const events: any[] = [];
      return new ExecutionResult({ leaveRequest, timeline, snapshot }, events);
    });
  }

  async cancelLeave(command: CancelLeaveCommand): Promise<ExecutionResult<any>> {
    return this.prisma.$transaction(async (tx) => {
      const id = command.data.leaveRequestId;
      await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'CANCELLED' }, tx);
      const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
      
      const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'CANCELLED', 'system', command.data, tx);
      const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
      
      const events: any[] = [];
      return new ExecutionResult({ leaveRequest, timeline, snapshot }, events);
    });
  }
}
