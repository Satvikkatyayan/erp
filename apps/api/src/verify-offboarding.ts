import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExitLifecycleService } from './modules/offboarding/services/exit-lifecycle.service';
import { PrismaService } from './common/prisma/prisma.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { Logger } from '@nestjs/common';

const logger = new Logger('Offboarding-Verification');

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule, { logger: ['error', 'warn', 'log', 'debug'] });
  
  const prisma = app.get(PrismaService);
  const lifecycle = app.get(ExitLifecycleService);

  logger.log('--- Setting up Offboarding Verification Data ---');

  // Find or create an Organization
  let org = await prisma.organization.findFirst();
  if (!org) {
    org = await prisma.organization.create({
      data: { name: 'Test Org Offboarding', code: 'TEST-OFF', tenantId: '00000000-0000-0000-0000-000000000000' }
    });
  }
  const tenantId = org.id;

  // Create an employee to offboard
  const employee = await prisma.empEmployee.create({
    data: {
      tenantId,
      organizationId: org.id,
      employeeNumber: 'EXIT-001',
      status: 'ACTIVE'
    }
  });

  // Create Policy and Reason
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

  const ctx: PlatformContext = {
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
    // Currently Engine is scaffolded, so we'll just check status
    if (request.status !== 'SUBMITTED') throw new Error('Expected SUBMITTED state');

    logger.log('[Test 3] Archive Employee');
    await lifecycle.archiveEmployee(ctx, request.id);
    
    const archivedEmp = await prisma.empEmployee.findUnique({ where: { id: employee.id } });
    logger.log(` - ✅ Employee Status is now: ${archivedEmp?.status} (Expected ARCHIVED)`);
    if (archivedEmp?.status !== 'ARCHIVED') throw new Error('Employee was not archived');

    logger.log('\n✅ Offboarding Module Verification Completed Successfully.');
  } catch (error) {
    logger.error('Verification Failed');
    console.error(error);
  } finally {
    // Cleanup
    await prisma.exitTimeline.deleteMany({ where: { actorId: employee.id }});
    await prisma.exitRequest.deleteMany({ where: { employeeId: employee.id }});
    await prisma.empEmployee.delete({ where: { id: employee.id }});
    await prisma.exitPolicy.delete({ where: { id: policy.id }});
    await prisma.exitReason.delete({ where: { id: reason.id }});
    
    await app.close();
  }
}

bootstrap();
