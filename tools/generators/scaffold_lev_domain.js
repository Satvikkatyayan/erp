const fs = require('fs');
const path = require('path');

const modulePath = path.join(__dirname, 'apps/api/src/modules/leave');
const dirs = ['controllers', 'services', 'events', 'repositories', 'validators', 'commands', 'queries'];

// Create directories
fs.mkdirSync(modulePath, { recursive: true });
dirs.forEach(d => fs.mkdirSync(path.join(modulePath, d), { recursive: true }));

// leave.module.ts
fs.writeFileSync(path.join(modulePath, 'leave.module.ts'), `
import { Module } from '@nestjs/common';
import { LeaveLifecycleService } from './services/leave-lifecycle.service';
import { LeaveBalanceService } from './services/leave-balance.service';
import { LeavePolicyService } from './services/leave-policy.service';
import { LeaveCarryForwardService } from './services/leave-carry-forward.service';

@Module({
  providers: [
    LeaveLifecycleService,
    LeaveBalanceService,
    LeavePolicyService,
    LeaveCarryForwardService
  ],
  exports: [
    LeaveLifecycleService,
    LeaveBalanceService,
    LeavePolicyService,
    LeaveCarryForwardService
  ]
})
export class LeaveModule {}
`);

// leave-lifecycle.service.ts
fs.writeFileSync(path.join(modulePath, 'services', 'leave-lifecycle.service.ts'), `
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
    this.logger.log(\`Requesting \${units} leave units for employee \${employeeId}\`);
    
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
`);

// leave-balance.service.ts
fs.writeFileSync(path.join(modulePath, 'services', 'leave-balance.service.ts'), `
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
`);

// leave-policy.service.ts
fs.writeFileSync(path.join(modulePath, 'services', 'leave-policy.service.ts'), `
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
`);

// leave-carry-forward.service.ts
fs.writeFileSync(path.join(modulePath, 'services', 'leave-carry-forward.service.ts'), `
import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class LeaveCarryForwardService {
  constructor(private readonly prisma: PrismaService, private readonly sdk: PlatformSDK) {}

  async processYearEnd(ctx: PlatformContext, employeeId: string, leaveTypeId: string) {
      // Stub for processing carry forward
      await this.sdk.events.publish(ctx, 'LeaveCarryForwardCompleted', { employeeId, leaveTypeId });
  }
}
`);

// update app.module.ts
const appModulePath = path.join(__dirname, 'apps/api/src/app.module.ts');
let appModuleContent = fs.readFileSync(appModulePath, 'utf8');

if (!appModuleContent.includes('LeaveModule')) {
  appModuleContent = appModuleContent.replace(
    /import \{ AttendanceModule \} from '.\/modules\/attendance\/attendance.module';/,
    "import { AttendanceModule } from './modules/attendance/attendance.module';\nimport { LeaveModule } from './modules/leave/leave.module';"
  );
  
  appModuleContent = appModuleContent.replace(
    /AttendanceModule,/,
    "AttendanceModule,\n    LeaveModule,"
  );
  
  fs.writeFileSync(appModulePath, appModuleContent, 'utf8');
}

console.log('Leave Module Scaffolded Successfully!');
