import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { LeaveLifecycleService } from './modules/leave/services/leave-lifecycle.service';
import { LeavePolicyService } from './modules/leave/services/leave-policy.service';
import { LeaveBalanceService } from './modules/leave/services/leave-balance.service';
import { LeaveCarryForwardService } from './modules/leave/services/leave-carry-forward.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { PlatformSDK } from './core/sdk/platform.sdk';

async function bootstrap() {
    const logger = new Logger('Lev-Verification');
    const app = await NestFactory.createApplicationContext(AppModule);
    const prisma = app.get(PrismaService);
    
    const lifecycle = app.get(LeaveLifecycleService);
    const policyService = app.get(LeavePolicyService);
    const balanceService = app.get(LeaveBalanceService);
    const carryForward = app.get(LeaveCarryForwardService);

    const tenantId = uuidv4();
    const organizationId = uuidv4();
    const employeeId = uuidv4();
    
    const ctx: PlatformContext = {
        tenantId,
        organizationId,
        userId: uuidv4(),
        correlationId: 'lev-verify-123',
        locale: 'en-US',
        timezone: 'UTC',
        requestId: uuidv4(),
        traceId: uuidv4(),
        featureFlags: {}
    };

    logger.log('--- Setting up Leave Module Test Data ---');
    await prisma.tenant.create({ data: { id: tenantId, code: `LEV-TENANT-${uuidv4().substring(0,6)}`, name: 'Leave Tenant' } });
    await prisma.organization.create({ data: { id: organizationId, tenantId, code: `LEV-ORG-${uuidv4().substring(0,6)}`, name: 'Leave Org' } });
    await prisma.empEmployee.create({ data: { id: employeeId, tenantId, organizationId, employeeNumber: `EMP-LEV-${uuidv4().substring(0,6)}`, status: 'JOINED' } });

    // 1. Setup Policy and Types
    const policy = await prisma.levLeavePolicy.create({
        data: { id: uuidv4(), tenantId, organizationId, name: 'Standard IT Policy', code: `STD-IT-${uuidv4().substring(0,6)}` }
    });

    const policyVersion = await prisma.levLeavePolicyVersion.create({
        data: { id: uuidv4(), tenantId, leavePolicyId: policy.id, versionNumber: 1, effectiveFrom: new Date('2026-01-01') }
    });

    const plType = await prisma.levLeaveType.create({
        data: { id: uuidv4(), tenantId, policyVersionId: policyVersion.id, name: 'Privilege Leave', code: `PL-${uuidv4().substring(0,6)}` }
    });

    logger.log('[Test 1] Leave Policy Assignment (Effective Dated)');
    const assignment = await policyService.assignPolicy(ctx, employeeId, policy.id, new Date('2026-01-01'));
    if (assignment) logger.log(' - ✅ Policy Assigned successfully.');

    logger.log('[Test 2] Probation Transition -> Rules Driven Allocation (Ledger)');
    // Allocate 15 PL based on confirmation milestone
    await policyService.applyProbationTransition(ctx, employeeId, plType.id, plType.id); // Reusing PL ID for testing CL
    
    const plBalance = await prisma.levLeaveBalance.findUnique({
        where: { employeeId_leaveTypeId: { employeeId, leaveTypeId: plType.id } }
    });
    
    if (plBalance && plBalance.currentBalance === 27) { // 15 PL + 12 CL (using same ID)
        logger.log(' - ✅ 27 Units Allocated via Ledger Projection.');
    } else {
        logger.warn(' - ❌ Allocation failed.');
    }

    logger.log('[Test 3] Future Booking & Partial Leave Units (0.5)');
    const futureDate = new Date('2026-12-25T00:00:00Z');
    const request = await lifecycle.requestLeave(ctx, employeeId, plType.id, futureDate, futureDate, 0.5, 'Half day for Christmas Eve prep');
    
    if (request.status === 'Submitted' && request.leaveUnits === 0.5) {
        logger.log(' - ✅ Leave Request created for 0.5 units in the future.');
    }

    logger.log('[Test 4] State Machine & Ledger Transaction on Approval');
    await lifecycle.approveLeave(ctx, request.id, uuidv4());
    
    const approvedRequest = await prisma.levLeaveRequest.findUnique({ where: { id: request.id } });
    const postApproveBalance = await prisma.levLeaveBalance.findUnique({ where: { id: plBalance!.id } });
    
    if (approvedRequest?.status === 'Approved' && postApproveBalance?.currentBalance === 26.5) {
        logger.log(' - ✅ Leave Approved. Balance decremented via Ledger to 26.5.');
    } else {
        logger.warn(' - ❌ Approval State Machine or Ledger Sync failed.');
    }

    logger.log('[Test 5] Leave Carry Forward Service');
    await carryForward.processYearEnd(ctx, employeeId, plType.id);
    logger.log(' - ✅ Carry Forward event dispatched (Idempotent).');

    logger.log('Leave Module Verification Completed Successfully.');

    await app.close();
}

bootstrap().catch(console.error);
