"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("./common/prisma/prisma.service");
const uuid_1 = require("uuid");
const employee_dashboard_service_1 = require("./modules/ess/services/employee-dashboard.service");
const employee_facade_1 = require("./modules/ess/facades/employee.facade");
const employee_document_service_1 = require("./modules/ess/services/employee-document.service");
const employee_session_service_1 = require("./modules/ess/services/employee-session.service");
const employee_preference_service_1 = require("./modules/ess/services/employee-preference.service");
async function bootstrap() {
    const logger = new common_1.Logger('ESS-Verification');
    logger.log('Starting Phase 6.0: Employee Self-Service Verification...');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const dashboardService = app.get(employee_dashboard_service_1.EmployeeDashboardService);
    const facade = app.get(employee_facade_1.EmployeeFacade);
    const documentService = app.get(employee_document_service_1.EmployeeDocumentService);
    const sessionService = app.get(employee_session_service_1.EmployeeSessionService);
    const preferenceService = app.get(employee_preference_service_1.EmployeePreferenceService);
    const employee = await prisma.empEmployee.findFirst({
        include: { personalDetails: true }
    });
    if (!employee) {
        logger.error('No employee found to test with. Run other verifications first to seed data.');
        process.exit(1);
    }
    const userId = employee.userId || (0, uuid_1.v4)();
    if (!employee.userId) {
        await prisma.empEmployee.update({
            where: { id: employee.id },
            data: { userId }
        });
    }
    const ctx = {
        tenantId: employee.tenantId,
        organizationId: employee.organizationId || 'default-org',
        userId: userId, employeeId: employee.id,
        correlationId: (0, uuid_1.v4)(),
        requestId: (0, uuid_1.v4)(),
        traceId: (0, uuid_1.v4)(),
        locale: 'en-US',
        timezone: 'UTC',
        featureFlags: {
            'PLATFORM_FEATURE_ESS': true
        }
    };
    logger.log('--- Setting up ESS Data ---');
    try {
        logger.log('[Test 1] Profile Fetch via Facade');
        const profile = await facade.getEmployeeProfile(ctx);
        logger.log(' - ✅ Profile fetched: ' + profile.firstName + ' ' + profile.lastName + ' (' + profile.employeeNumber + ')');
        logger.log('[Test 2] Preferences Configuration');
        await preferenceService.updatePreferences(ctx, {
            language: 'fr-FR',
            timezone: 'Europe/Paris',
            theme: 'dark'
        });
        const prefs = await preferenceService.getPreferences(ctx);
        logger.log(' - ✅ Preferences updated: Language=' + prefs?.language + ', Theme=' + prefs?.theme);
        await prisma.essDashboardWidget.createMany({
            data: [
                { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Attendance', order: 1 },
                { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Leave', order: 2 },
                { tenantId: ctx.tenantId, employeeId: ctx.employeeId, widgetKey: 'Assets', order: 3 }
            ],
            skipDuplicates: true
        });
        logger.log('[Test 3] Dashboard Widget Aggregation');
        const dashboard = await dashboardService.getDashboard(ctx);
        logger.log(' - ✅ Dashboard generated with ' + dashboard.widgets.length + ' widgets');
        dashboard.widgets.forEach(w => {
            logger.log('   -> Widget [' + w.key + ']: ' + w.title);
        });
        logger.log('[Test 4] Device & Session Registration');
        const deviceId = (0, uuid_1.v4)();
        await sessionService.registerDevice(ctx, deviceId, "Satvik's iPhone");
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        await sessionService.createSession(ctx, (0, uuid_1.v4)(), deviceId, '192.168.1.1', 'Mozilla/5.0', tomorrow);
        const sessions = await sessionService.getActiveSessions(ctx);
        logger.log(' - ✅ ' + sessions.length + ' active sessions tracked.');
        logger.log('[Test 5] Document Audit Tracking');
        const docId = (0, uuid_1.v4)();
        await documentService.viewDocument(ctx, docId, '192.168.1.1', 'Mozilla/5.0');
        await documentService.downloadDocument(ctx, docId, '192.168.1.1', 'Mozilla/5.0');
        const logs = await prisma.essDocumentAuditLog.findMany({ where: { employeeId: ctx.employeeId, documentId: docId } });
        logger.log(' - ✅ Document audit trails created: ' + logs.map(l => l.action).join(', '));
        logger.log('[Test 6] Policy Acknowledgement Tracking');
        await documentService.acknowledgePolicy(ctx, docId, 'Code of Conduct 2026', '192.168.1.1', 'Mozilla/5.0');
        const acks = await prisma.essAcknowledgement.findMany({ where: { employeeId: ctx.employeeId, documentId: docId } });
        logger.log(' - ✅ Policy ' + acks[0].policyName + ' successfully acknowledged.');
        logger.log('\\n✅ ESS Module Verification Completed Successfully.');
    }
    catch (error) {
        logger.error('Verification Failed');
        console.error(error);
    }
    await app.close();
}
bootstrap();
//# sourceMappingURL=verify-ess.js.map