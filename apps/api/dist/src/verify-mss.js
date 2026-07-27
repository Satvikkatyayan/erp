"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const manager_facade_1 = require("./modules/mss/facades/manager.facade");
const team_scope_resolver_1 = require("./modules/mss/resolvers/team-scope.resolver");
const dashboard_widget_registry_1 = require("./modules/mss/widgets/dashboard-widget.registry");
const prisma_service_1 = require("./common/prisma/prisma.service");
const common_1 = require("@nestjs/common");
const logger = new common_1.Logger('MSS-Verification');
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule, { logger: ['error', 'warn', 'log', 'debug'] });
    const prisma = app.get(prisma_service_1.PrismaService);
    const managerFacade = app.get(manager_facade_1.ManagerFacade);
    const scopeResolver = app.get(team_scope_resolver_1.TeamScopeResolver);
    const widgetRegistry = app.get(dashboard_widget_registry_1.DashboardWidgetRegistry);
    logger.log('--- Setting up MSS Verification Data ---');
    let org = await prisma.organization.findFirst();
    if (!org) {
        org = await prisma.organization.create({
            data: { name: 'Test Org MSS', code: 'TEST-MSS', tenantId: '00000000-0000-0000-0000-000000000000' }
        });
    }
    const tenantId = org.id;
    const empL1 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L1' } });
    const empL2 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L2' } });
    const empL3 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L3' } });
    await prisma.empPersonalDetails.create({ data: { employeeId: empL1.id, firstName: 'Alice', lastName: 'Director' } });
    await prisma.empPersonalDetails.create({ data: { employeeId: empL2.id, firstName: 'Bob', lastName: 'Manager' } });
    await prisma.empPersonalDetails.create({ data: { employeeId: empL3.id, firstName: 'Charlie', lastName: 'Worker' } });
    await prisma.empReportingAssignment.create({
        data: {
            employeeId: empL2.id,
            managerId: empL1.id,
            relationshipType: 'DIRECT'
        }
    });
    await prisma.empReportingAssignment.create({
        data: {
            employeeId: empL3.id,
            managerId: empL2.id,
            relationshipType: 'DIRECT'
        }
    });
    const ctx = {
        userId: 'mock-user-id',
        tenantId,
        organizationId: org.id,
        employeeId: empL1.id,
        correlationId: 'mock-correlation-id',
        requestId: 'mock-request-id',
        traceId: 'mock-trace-id',
        locale: 'en-US',
        timezone: 'UTC',
        featureFlags: { 'MSS_ALLOW_INDIRECT': true }
    };
    try {
        logger.log('[Test 1] Widget Registry');
        const widgets = widgetRegistry.getAll();
        logger.log(` - ✅ Registered Widgets: ${widgets.map(w => w.key).join(', ')}`);
        logger.log('[Test 2] Team Scope Resolution (Indirect = true)');
        const scopeIds = await scopeResolver.resolveAuthorizedTeamIds(ctx);
        logger.log(` - ✅ Team Scope Resolved: ${scopeIds.length} members (Expected 2: Bob and Charlie)`);
        if (scopeIds.length !== 2)
            throw new Error(`Expected 2 scope IDs, got ${scopeIds.length}`);
        logger.log('[Test 3] Team Directory Aggregation');
        const directory = await managerFacade.getTeamDirectory(ctx);
        logger.log(` - ✅ Team Directory fetched (${directory.length} employees)`);
        directory.forEach(emp => logger.log(`    -> ${emp.name} (${emp.position})`));
        logger.log('[Test 4] Manager Dashboard Generation');
        const dashboard = await managerFacade.getDashboard(ctx);
        logger.log(` - ✅ Dashboard generated with keys: ${Object.keys(dashboard.widgets).join(', ')}`);
        await prisma.mssApprovalView.create({
            data: {
                tenantId,
                managerId: empL1.id,
                sourceModule: 'LEAVE',
                workflowId: '00000000-0000-0000-0000-000000000001',
                submittedById: empL2.id,
                payloadSummary: { leaveType: 'Sick', days: 2 }
            }
        });
        const dashWithApproval = await managerFacade.getDashboard(ctx);
        logger.log(` - ✅ Dashboard after approval creation: ${JSON.stringify(dashWithApproval.widgets)}`);
        logger.log('\n✅ MSS Module Verification Completed Successfully.');
    }
    catch (error) {
        logger.error('Verification Failed');
        console.error(error);
    }
    finally {
        await prisma.mssApprovalView.deleteMany({ where: { managerId: empL1.id } });
        await prisma.empReportingAssignment.deleteMany({ where: { managerId: empL1.id } });
        await prisma.empReportingAssignment.deleteMany({ where: { managerId: empL2.id } });
        await prisma.empEmployee.delete({ where: { id: empL1.id } });
        await prisma.empEmployee.delete({ where: { id: empL2.id } });
        await prisma.empEmployee.delete({ where: { id: empL3.id } });
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=verify-mss.js.map