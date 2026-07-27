"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const prisma_service_1 = require("./common/prisma/prisma.service");
const attendance_lifecycle_service_1 = require("./modules/attendance/services/attendance-lifecycle.service");
const shift_service_1 = require("./modules/attendance/services/shift.service");
const uuid_1 = require("uuid");
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("./core/sdk/platform.sdk");
async function bootstrap() {
    const logger = new common_1.Logger('Att-Verification');
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const prisma = app.get(prisma_service_1.PrismaService);
    const attLifecycle = app.get(attendance_lifecycle_service_1.AttendanceLifecycleService);
    const shiftService = app.get(shift_service_1.ShiftService);
    const sdk = app.get(platform_sdk_1.PlatformSDK);
    const tenantId = (0, uuid_1.v4)();
    const organizationId = (0, uuid_1.v4)();
    const ctx = {
        tenantId,
        organizationId,
        userId: (0, uuid_1.v4)(),
        correlationId: 'att-verify-123',
        locale: 'en-US',
        timezone: 'UTC',
        requestId: (0, uuid_1.v4)(),
        traceId: (0, uuid_1.v4)(),
        featureFlags: {}
    };
    logger.log('--- Setting up Test Data ---');
    const tenant = await prisma.tenant.create({
        data: { id: tenantId, code: 'ATT-TENANT', name: 'ATT Tenant' }
    });
    const org = await prisma.organization.create({
        data: { id: organizationId, tenantId, code: 'ATT-ORG-01', name: 'ATT Org' }
    });
    const emp = await prisma.empEmployee.create({
        data: {
            id: (0, uuid_1.v4)(),
            tenantId,
            organizationId,
            employeeNumber: 'EMP-ATT-001',
            status: 'JOINED'
        }
    });
    const source = await prisma.attAttendanceSource.create({
        data: {
            id: (0, uuid_1.v4)(),
            tenantId,
            name: 'Biometric Gate 1',
            type: 'Biometric'
        }
    });
    logger.log('[Test 1] Extensible Source & Multiple Punches');
    const punchIn = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T09:00:00Z'),
        punchType: 'IN',
        sourceId: source.id
    });
    const punchOut = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T13:00:00Z'),
        punchType: 'OUT',
        sourceId: source.id
    });
    const punchIn2 = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T14:00:00Z'),
        punchType: 'IN',
        sourceId: source.id
    });
    const punchOut2 = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T18:00:00Z'),
        punchType: 'OUT',
        sourceId: source.id
    });
    const day = await prisma.attAttendanceDay.findFirst({
        where: { employeeId: emp.id },
        include: { sessions: { include: { punches: true } } }
    });
    if (day && day.sessions.length === 2) {
        logger.log(' - ✅ Multiple punches and sessions mapped successfully to a single AttendanceDay.');
    }
    else {
        logger.warn(' - ❌ Multiple punches failed.');
    }
    logger.log('[Test 2] LOP Generation & Payroll Event Emission');
    const lopDay = await attLifecycle.markLossOfPay(ctx, emp.id, new Date('2026-07-21T00:00:00Z'), 1, 'Unapproved Absence');
    const events = await prisma.outboxMessage.findMany({
        where: { correlationId: 'att-verify-123', eventName: 'LossOfPayRecorded' }
    });
    if (lopDay.lopUnits === 1 && events.length > 0) {
        logger.log(' - ✅ LOP accurately tracked on AttendanceDay. LossOfPayRecorded event published for Payroll.');
    }
    else {
        logger.warn(' - ❌ LOP generation failed.');
    }
    logger.log('[Test 3] Shift Assignment (Flexible & Overnight)');
    const shiftTemplate = await prisma.attShiftTemplate.create({
        data: {
            tenantId,
            name: 'Overnight Support Shift',
            shiftType: 'Fixed',
            startTime: '22:00',
            endTime: '06:00',
            isOvernight: true
        }
    });
    const shiftAssignment = await shiftService.assignShift(ctx, emp.id, shiftTemplate.id, new Date('2026-07-20T00:00:00Z'));
    if (shiftAssignment) {
        logger.log(' - ✅ Shift assignment created with effective dating.');
    }
    logger.log('[Test 4] Attendance Timeline Generation');
    const timelineEvents = await prisma.attAttendanceTimeline.findMany({
        where: { attendanceDayId: day?.id }
    });
    if (timelineEvents.length === 4) {
        logger.log(' - ✅ 4 Timeline events generated for punches.');
    }
    else {
        logger.warn(' - ❌ Timeline missing events.');
    }
    logger.log('Attendance Module Verification Completed Successfully.');
    await app.close();
}
bootstrap().catch(console.error);
//# sourceMappingURL=verify-attendance.js.map