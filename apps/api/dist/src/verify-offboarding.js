"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const exit_lifecycle_service_1 = require("./modules/offboarding/services/exit-lifecycle.service");
const prisma_service_1 = require("./common/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('Offboarding-Verification');
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: ['error', 'warn', 'log', 'debug'] });
    const prisma = app.get(prisma_service_1.PrismaService);
    const lifecycle = app.get(exit_lifecycle_service_1.ExitLifecycleService);
    logger.log('--- Setting up Offboarding Verification Data ---');
    let org = await prisma.organization.findFirst();
    if (!org) {
        org = await prisma.organization.create({
            data: { name: 'Test Org Offboarding', code: 'TEST-OFF', tenantId: '00000000-0000-0000-0000-000000000000' }
        });
    }
    const tenantId = org.id;
    const employee = await prisma.empEmployee.create({
        data: {
            tenantId,
            organizationId: org.id,
            employeeNumber: 'EXIT-001',
            status: 'ACTIVE'
        }
    });
    const policy = await prisma.exitPolicy.create({
        data: {
            tenantId,
            policyName: 'Standard Notice 30 Days',
            noticePeriodDays: 30,
            effectiveFrom: new Date(),
        }
    });
    const reason = await prisma.exitReason.create({
        data: {
            tenantId,
            code: 'BETTER_OPPORTUNITY',
            label: 'Better Opportunity',
            category: 'VOLUNTARY'
        }
    });
    const ctx = {
        userId: 'mock-user-id',
        tenantId,
        organizationId: org.id,
        employeeId: employee.id,
        featureFlags: {},
        correlationId: 'mock-correlation-id',
        requestId: 'req-offboard-001',
        traceId: 'mock-trace-id',
        locale: 'en-US',
        timezone: 'UTC'
    };
    try {
        logger.log('[Test 1] Submit Exit Request');
        const request = await lifecycle.startExit(ctx, employee.id, policy.id, reason.id);
        logger.log(` - ✅ Exit Request Created (ID: ${request.id}, Status: ${request.status})`);
        logger.log('[Test 2] State Machine & Clearances placeholder');
        if (request.status !== 'SUBMITTED')
            throw new Error('Expected SUBMITTED state');
        logger.log('[Test 3] Archive Employee');
        await lifecycle.archiveEmployee(ctx, request.id);
        const archivedEmp = await prisma.empEmployee.findUnique({ where: { id: employee.id } });
        logger.log(` - ✅ Employee Status is now: ${archivedEmp?.status} (Expected ARCHIVED)`);
        if (archivedEmp?.status !== 'ARCHIVED')
            throw new Error('Employee was not archived');
        logger.log('\n✅ Offboarding Module Verification Completed Successfully.');
    }
    catch (error) {
        logger.error('Verification Failed');
        console.error(error);
    }
    finally {
        await prisma.exitTimeline.deleteMany({ where: { actorId: employee.id } });
        await prisma.exitRequest.deleteMany({ where: { employeeId: employee.id } });
        await prisma.empEmployee.delete({ where: { id: employee.id } });
        await prisma.exitPolicy.delete({ where: { id: policy.id } });
        await prisma.exitReason.delete({ where: { id: reason.id } });
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=verify-offboarding.js.map