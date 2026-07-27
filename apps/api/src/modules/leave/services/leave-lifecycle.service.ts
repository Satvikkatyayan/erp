
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { LeaveBalanceService } from './leave-balance.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeaveLifecycleService {
  private readonly logger = new Logger(LeaveLifecycleService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly balanceService: LeaveBalanceService
  ) {}

  async requestLeave(ctx: PlatformContext, employeeId: string, leaveTypeId: string, startDate: Date, endDate: Date, units: number, reason: string) {
    this.logger.log(`Requesting ${units} leave units for employee ${employeeId}`);
    
    // Future Date / Entitlement checks would happen via SDK Rules Engine here...
    
    const request = await this.prisma.levLeaveRequest.create({
      data: {
        id: uuidv4(),
        tenantId: ctx.tenantId,
        employeeId,
        leaveTypeId,
        startDate,
        endDate,
        leaveUnits: units,
        reason,
        status: 'Submitted'
      }
    });

    // Create Timeline entry
    await this.prisma.levLeaveTimeline.create({
      data: {
        id: uuidv4(),
        tenantId: ctx.tenantId,
        leaveRequestId: request.id,
        eventType: 'LeaveSubmitted',
        actorId: ctx.userId
      }
    });

    // Publish Event
    await this.sdk.events.publish(ctx, 'LeaveRequested', { requestId: request.id, employeeId });

    return request;
  }

  async approveLeave(ctx: PlatformContext, requestId: string, approverId: string) {
    const request = await this.prisma.levLeaveRequest.findUniqueOrThrow({ where: { id: requestId } });
    
    const updated = await this.prisma.levLeaveRequest.update({
      where: { id: requestId },
      data: { status: 'Approved' }
    });

    await this.prisma.levLeaveApproval.create({
        data: {
            id: uuidv4(),
            tenantId: ctx.tenantId,
            leaveRequestId: request.id,
            approverId,
            level: 1,
            status: 'Approved',
            approvedAt: new Date()
        }
    });

    // Debit Balance via Ledger
    await this.balanceService.bookLeaveTransaction(
        ctx, 
        request.employeeId, 
        request.leaveTypeId, 
        'Consumption', 
        -request.leaveUnits, 
        request.id
    );

    await this.prisma.levLeaveTimeline.create({
      data: {
        id: uuidv4(),
        tenantId: ctx.tenantId,
        leaveRequestId: request.id,
        eventType: 'LeaveApproved',
        actorId: approverId
      }
    });

    await this.sdk.events.publish(ctx, 'LeaveApproved', { requestId: request.id });
    return updated;
  }
}
