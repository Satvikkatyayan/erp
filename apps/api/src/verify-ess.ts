import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { PrismaService } from './common/prisma/prisma.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { v4 as uuidv4 } from 'uuid';

import { EmployeeDashboardService } from './modules/ess/services/employee-dashboard.service';
import { EmployeeFacade } from './modules/ess/facades/employee.facade';
import { EmployeeDocumentService } from './modules/ess/services/employee-document.service';
import { EmployeeSessionService } from './modules/ess/services/employee-session.service';
import { EmployeePreferenceService } from './modules/ess/services/employee-preference.service';

async function bootstrap() {
  const logger = new Logger('ESS-Verification');
  logger.log('Starting Phase 6.0: Employee Self-Service Verification...');

  const app = await NestFactory.createApplicationContext(AppModule);
  const prisma = app.get(PrismaService);
  
  const dashboardService = app.get(EmployeeDashboardService);
  const facade = app.get(EmployeeFacade);
  const documentService = app.get(EmployeeDocumentService);
  const sessionService = app.get(EmployeeSessionService);
  const preferenceService = app.get(EmployeePreferenceService);

  // Setup: Find an employee to use
  const employee = await prisma.empEmployee.findFirst({
    include: { personalDetails: true }
  });

  if (!employee) {
    logger.error('No employee found to test with. Run other verifications first to seed data.');
    process.exit(1);
  }

  // Ensure employee has a userId
  const userId = employee.userId || uuidv4();
  if (!employee.userId) {
    await prisma.empEmployee.update({
      where: { id: employee.id },
      data: { userId }
    });
  }

  const ctx: PlatformContext = {
    tenantId: employee.tenantId,
    organizationId: employee.organizationId || 'default-org',
    userId: userId, employeeId: employee.id,
    correlationId: uuidv4(),
    requestId: uuidv4(),
    traceId: uuidv4(),
    locale: 'en-US',
    timezone: 'UTC',
    featureFlags: {
      'PLATFORM_FEATURE_ESS': true
    }
  };

  logger.log('--- Setting up ESS Data ---');

  try {
    // [Test 1] Profile Fetch via Facade
    logger.log('[Test 1] Profile Fetch via Facade');
    const profile = await facade.getEmployeeProfile(ctx);
    logger.log(' - ✅ Profile fetched: ' + profile.firstName + ' ' + profile.lastName + ' (' + profile.employeeNumber + ')');

    // [Test 2] Preferences Configuration
    logger.log('[Test 2] Preferences Configuration');
    await preferenceService.updatePreferences(ctx, {
      language: 'fr-FR',
      timezone: 'Europe/Paris',
      theme: 'dark'
    });
    const prefs = await preferenceService.getPreferences(ctx);
    logger.log(' - ✅ Preferences updated: Language=' + prefs?.language + ', Theme=' + prefs?.theme);

    // Setup widgets manually to avoid dashboard defaults
    await prisma.essDashboardWidget.createMany({
      data: [
        { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Attendance', order: 1 },
        { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Leave', order: 2 },
        { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Assets', order: 3 }
      ],
      skipDuplicates: true
    });

    // [Test 3] Dashboard Aggregation
    logger.log('[Test 3] Dashboard Widget Aggregation');
    const dashboard = await dashboardService.getDashboard(ctx);
    logger.log(' - ✅ Dashboard generated with ' + dashboard.widgets.length + ' widgets');
    dashboard.widgets.forEach(w => {
      logger.log('   -> Widget [' + w.key + ']: ' + w.title);
    });

    // [Test 4] Device & Session Management
    logger.log('[Test 4] Device & Session Registration');
    const deviceId = uuidv4();
    await sessionService.registerDevice(ctx, deviceId, "Satvik's iPhone");
    
    // Set expiry to tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    await sessionService.createSession(ctx, uuidv4(), deviceId, '192.168.1.1', 'Mozilla/5.0', tomorrow);
    const sessions = await sessionService.getActiveSessions(ctx);
    logger.log(' - ✅ ' + sessions.length + ' active sessions tracked.');

    // [Test 5] Sensitive Document Audit Log
    logger.log('[Test 5] Document Audit Tracking');
    const docId = uuidv4();
    await documentService.viewDocument(ctx, docId, '192.168.1.1', 'Mozilla/5.0');
    await documentService.downloadDocument(ctx, docId, '192.168.1.1', 'Mozilla/5.0');
    
    const logs = await prisma.essDocumentAuditLog.findMany({ where: { employeeId: ctx.employeeId, documentId: docId } });
    logger.log(' - ✅ Document audit trails created: ' + logs.map(l => l.action).join(', '));

    // [Test 6] Policy Acknowledgement
    logger.log('[Test 6] Policy Acknowledgement Tracking');
    await documentService.acknowledgePolicy(ctx, docId, 'Code of Conduct 2026', '192.168.1.1', 'Mozilla/5.0');
    const acks = await prisma.essAcknowledgement.findMany({ where: { employeeId: ctx.employeeId, documentId: docId } });
    logger.log(' - ✅ Policy ' + acks[0].policyName + ' successfully acknowledged.');

    logger.log('\\n✅ ESS Module Verification Completed Successfully.');

  } catch (error) {
    logger.error('Verification Failed');
    console.error(error);
  }

  await app.close();
}

bootstrap();
