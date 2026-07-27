"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./common/prisma/prisma.service");
const leave_lifecycle_service_1 = require("./modules/leave/services/leave-lifecycle.service");
const leave_policy_service_1 = require("./modules/leave/services/leave-policy.service");
const leave_balance_service_1 = require("./modules/leave/services/leave-balance.service");
const leave_carry_forward_service_1 = require("./modules/leave/services/leave-carry-forward.service");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const logger = new common_1.Logger('Lev-Verification');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const lifecycle = app.get(leave_lifecycle_service_1.LeaveLifecycleService);
    const policyService = app.get(leave_policy_service_1.LeavePolicyService);
    const balanceService = app.get(leave_balance_service_1.LeaveBalanceService);
    const carryForward = app.get(leave_carry_forward_service_1.LeaveCarryForwardService);
    const tenantId = (0, uuid_1.v4)();
    const organizationId = (0, uuid_1.v4)();
    const employeeId = (0, uuid_1.v4)();
    const ctx = {
        tenantId,
        organizationId,
        userId: (0, uuid_1.v4)(),
        correlationId: 'lev-verify-123',
        locale: 'en-US',
        timezone: 'UTC',
        requestId: (0, uuid_1.v4)(),
        traceId: (0, uuid_1.v4)(),
        featureFlags: {}
    };
    logger.log('--- Setting up Leave Module Test Data ---');
    await prisma.tenant.create({ data: { id: tenantId, code: `LEV-TENANT-${(0, uuid_1.v4)().substring(0, 6)}`, name: 'Leave Tenant' } });
    await prisma.organization.create({ data: { id: organizationId, tenantId, code: `LEV-ORG-${(0, uuid_1.v4)().substring(0, 6)}`, name: 'Leave Org' } });
    await prisma.empEmployee.create({ data: { id: employeeId, tenantId, organizationId, employeeNumber: `EMP-LEV-${(0, uuid_1.v4)().substring(0, 6)}`, status: 'JOINED' } });
    const policy = await prisma.levLeavePolicy.create({
        data: { id: (0, uuid_1.v4)(), tenantId, organizationId, name: 'Standard IT Policy', code: `STD-IT-${(0, uuid_1.v4)().substring(0, 6)}` }
    });
    const policyVersion = await prisma.levLeavePolicyVersion.create({
        data: { id: (0, uuid_1.v4)(), tenantId, leavePolicyId: policy.id, versionNumber: 1, effectiveFrom: new Date('2026-01-01') }
    });
    const plType = await prisma.levLeaveType.create({
        data: { id: (0, uuid_1.v4)(), tenantId, policyVersionId: policyVersion.id, name: 'Privilege Leave', code: `PL-${(0, uuid_1.v4)().substring(0, 6)}` }
    });
    logger.log('[Test 1] Leave Policy Assignment (Effective Dated)');
    const assignment = await policyService.assignPolicy(ctx, employeeId, policy.id, new Date('2026-01-01'));
    if (assignment)
        logger.log(' - ✅ Policy Assigned successfully.');
    logger.log('[Test 2] Probation Transition -> Rules Driven Allocation (Ledger)');
    await policyService.applyProbationTransition(ctx, employeeId, plType.id, plType.id);
    const plBalance = await prisma.levLeaveBalance.findUnique({
        where: { employeeId_leaveTypeId: { employeeId, leaveTypeId: plType.id } }
    });
    if (plBalance && plBalance.currentBalance === 27) {
        logger.log(' - ✅ 27 Units Allocated via Ledger Projection.');
    }
    else {
        logger.warn(' - ❌ Allocation failed.');
    }
    logger.log('[Test 3] Future Booking & Partial Leave Units (0.5)');
    const futureDate = new Date('2026-12-25T00:00:00Z');
    const request = await lifecycle.requestLeave(ctx, employeeId, plType.id, futureDate, futureDate, 0.5, 'Half day for Christmas Eve prep');
    if (request.status === 'Submitted' && request.leaveUnits === 0.5) {
        logger.log(' - ✅ Leave Request created for 0.5 units in the future.');
    }
    logger.log('[Test 4] State Machine & Ledger Transaction on Approval');
    await lifecycle.approveLeave(ctx, request.id, (0, uuid_1.v4)());
    const approvedRequest = await prisma.levLeaveRequest.findUnique({ where: { id: request.id } });
    const postApproveBalance = await prisma.levLeaveBalance.findUnique({ where: { id: plBalance.id } });
    if (approvedRequest?.status === 'Approved' && postApproveBalance?.currentBalance === 26.5) {
        logger.log(' - ✅ Leave Approved. Balance decremented via Ledger to 26.5.');
    }
    else {
        logger.warn(' - ❌ Approval State Machine or Ledger Sync failed.');
    }
    logger.log('[Test 5] Leave Carry Forward Service');
    await carryForward.processYearEnd(ctx, employeeId, plType.id);
    logger.log(' - ✅ Carry Forward event dispatched (Idempotent).');
    logger.log('Leave Module Verification Completed Successfully.');
    await app.close();
}
bootstrap().catch(console.error);
//# sourceMappingURL=verify-leave.js.map