
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { v4 as uuidv4 } from 'uuid';
import { LeaveBalanceService } from './leave-balance.service';

@Injectable()
export class LeavePolicyService {
  constructor(private readonly prisma: PrismaService, private readonly sdk: PlatformSDK, private readonly balanceService: LeaveBalanceService) {}

  async assignPolicy(ctx: PlatformContext, employeeId: string, leavePolicyId: string, effectiveFrom: Date) {
      const assignment = await this.prisma.levLeavePolicyAssignment.create({
          data: {
              id: uuidv4(),
              tenantId: ctx.tenantId,
              employeeId,
              leavePolicyId,
              effectiveFrom
          }
      });
      await this.sdk.events.publish(ctx, 'LeavePolicyAssigned', { employeeId, leavePolicyId });
      return assignment;
  }

  async applyProbationTransition(ctx: PlatformContext, employeeId: string, plTypeId: string, clTypeId: string) {
      // Mocking RulesEngine check for Transition -> giving 15 PL and 12 CL
      await this.balanceService.allocateEntitlement(ctx, employeeId, plTypeId, 15, new Date());
      await this.balanceService.allocateEntitlement(ctx, employeeId, clTypeId, 12, new Date());
  }
}
