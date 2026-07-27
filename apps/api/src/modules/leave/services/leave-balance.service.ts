
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class LeaveBalanceService {
  private readonly logger = new Logger(LeaveBalanceService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK
  ) {}

  async bookLeaveTransaction(ctx: PlatformContext, employeeId: string, leaveTypeId: string, transactionType: string, units: number, referenceId?: string) {
    // Write Immutable Ledger
    const ledger = await this.prisma.levLeaveLedger.create({
        data: {
            id: uuidv4(),
            tenantId: ctx.tenantId,
            employeeId,
            leaveTypeId,
            transactionType,
            units,
            referenceId
        }
    });

    // Project Ledger into Balance
    let balance = await this.prisma.levLeaveBalance.findUnique({
        where: { employeeId_leaveTypeId: { employeeId, leaveTypeId } }
    });

    if (!balance) {
        balance = await this.prisma.levLeaveBalance.create({
            data: {
                id: uuidv4(),
                tenantId: ctx.tenantId,
                employeeId,
                leaveTypeId,
                totalAccrued: units > 0 ? units : 0,
                totalConsumed: units < 0 ? Math.abs(units) : 0,
                currentBalance: units
            }
        });
    } else {
        const updateData: any = { currentBalance: { increment: units } };
        if (units > 0 && transactionType !== 'Adjustment') updateData.totalAccrued = { increment: units };
        if (units < 0) updateData.totalConsumed = { increment: Math.abs(units) };
        
        balance = await this.prisma.levLeaveBalance.update({
            where: { id: balance.id },
            data: updateData
        });
    }

    await this.sdk.events.publish(ctx, 'LeaveBalanceCalculated', { employeeId, leaveTypeId, currentBalance: balance.currentBalance });
    
    return balance;
  }

  async allocateEntitlement(ctx: PlatformContext, employeeId: string, leaveTypeId: string, units: number, validFrom: Date, validTo?: Date) {
      const entitlement = await this.prisma.levLeaveEntitlement.create({
          data: {
              id: uuidv4(),
              tenantId: ctx.tenantId,
              employeeId,
              leaveTypeId,
              entitledUnits: units,
              validFrom,
              validTo
          }
      });

      // Allocate Initial Balance
      await this.bookLeaveTransaction(ctx, employeeId, leaveTypeId, 'Allocation', units, entitlement.id);
      return entitlement;
  }
}
