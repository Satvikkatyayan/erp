import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ManagerFacade } from './modules/mss/facades/manager.facade';
import { TeamScopeResolver } from './modules/mss/resolvers/team-scope.resolver';
import { DashboardWidgetRegistry } from './modules/mss/widgets/dashboard-widget.registry';
import { PrismaService } from './common/prisma/prisma.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { Logger } from '@nestjs/common';

const logger = new Logger('MSS-Verification');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn', 'log', 'debug'] });
  
  const prisma = app.get(PrismaService);
  const managerFacade = app.get(ManagerFacade);
  const scopeResolver = app.get(TeamScopeResolver);
  const widgetRegistry = app.get(DashboardWidgetRegistry);

  logger.log('--- Setting up MSS Verification Data ---');

  // Find or create an Organization
  let org = await prisma.organization.findFirst();
  if (!org) {
    org = await prisma.organization.create({
      data: { name: 'Test Org MSS', code: 'TEST-MSS', tenantId: '00000000-0000-0000-0000-000000000000' }
    });
  }
  const tenantId = org.id;

  const empL1 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L1' }});
  const empL2 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L2' }});
  const empL3 = await prisma.empEmployee.create({ data: { tenantId, organizationId: org.id, status: 'ACTIVE', employeeNumber: 'MSS-L3' }});

  await prisma.empPersonalDetails.create({ data: { employeeId: empL1.id, firstName: 'Alice', lastName: 'Director' }});
  await prisma.empPersonalDetails.create({ data: { employeeId: empL2.id, firstName: 'Bob', lastName: 'Manager' }});
  await prisma.empPersonalDetails.create({ data: { employeeId: empL3.id, firstName: 'Charlie', lastName: 'Worker' }});

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

  const ctx: PlatformContext = {
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
    if (scopeIds.length !== 2) throw new Error(`Expected 2 scope IDs, got ${scopeIds.length}`);

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
  } catch (error) {
    logger.error('Verification Failed');
    console.error(error);
  } finally {
    await prisma.mssApprovalView.deleteMany({ where: { managerId: empL1.id }});
    await prisma.empReportingAssignment.deleteMany({ where: { managerId: empL1.id }});
    await prisma.empReportingAssignment.deleteMany({ where: { managerId: empL2.id }});
    await prisma.empEmployee.delete({ where: { id: empL1.id }});
    await prisma.empEmployee.delete({ where: { id: empL2.id }});
    await prisma.empEmployee.delete({ where: { id: empL3.id }});
    
    await app.close();
  }
}

bootstrap();
