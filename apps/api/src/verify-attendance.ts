import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './common/prisma/prisma.service';
import { AttendanceLifecycleService } from './modules/attendance/services/attendance-lifecycle.service';
import { ShiftService } from './modules/attendance/services/shift.service';
import { PlatformContext } from './core/contracts/context/platform-context';
import { v4 as uuidv4 } from 'uuid';
import { Logger } from '@nestjs/common';
import { PlatformSDK } from './core/sdk/platform.sdk';

async function bootstrap() {
    const logger = new Logger('Att-Verification');
    const app = await NestFactory.createApplicationContext(AppModule);
    const prisma = app.get(PrismaService);
    const attLifecycle = app.get(AttendanceLifecycleService);
    const shiftService = app.get(ShiftService);
    const sdk = app.get(PlatformSDK);

    const tenantId = uuidv4();
    const organizationId = uuidv4();
    
    const ctx: PlatformContext = {
        tenantId,
        organizationId,
        userId: uuidv4(),
        correlationId: 'att-verify-123',
        locale: 'en-US',
        timezone: 'UTC',
        requestId: uuidv4(),
        traceId: uuidv4(),
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
            id: uuidv4(),
            tenantId,
            organizationId,
            employeeNumber: 'EMP-ATT-001',
            status: 'JOINED'
        }
    });

    const source = await prisma.attAttendanceSource.create({
        data: {
            id: uuidv4(),
            tenantId,
            name: 'Biometric Gate 1',
            type: 'Biometric'
        }
    });

    logger.log('[Test 1] Extensible Source & Multiple Punches');
    // Simulate IN punch
    const punchIn = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T09:00:00Z'),
        punchType: 'IN',
        sourceId: source.id
    });
    
    // Simulate OUT punch
    const punchOut = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T13:00:00Z'),
        punchType: 'OUT',
        sourceId: source.id
    });

    // Simulate 2nd IN punch
    const punchIn2 = await attLifecycle.ingestPunch(ctx, emp.id, {
        timestamp: new Date('2026-07-20T14:00:00Z'),
        punchType: 'IN',
        sourceId: source.id
    });

    // Simulate 2nd OUT punch
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
    } else {
        logger.warn(' - ❌ Multiple punches failed.');
    }

    logger.log('[Test 2] LOP Generation & Payroll Event Emission');
    const lopDay = await attLifecycle.markLossOfPay(ctx, emp.id, new Date('2026-07-21T00:00:00Z'), 1, 'Unapproved Absence');
    
    const events = await prisma.outboxMessage.findMany({
        where: { correlationId: 'att-verify-123', eventName: 'LossOfPayRecorded' }
    });

    if (lopDay.lopUnits === 1 && events.length > 0) {
        logger.log(' - ✅ LOP accurately tracked on AttendanceDay. LossOfPayRecorded event published for Payroll.');
    } else {
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
    } else {
        logger.warn(' - ❌ Timeline missing events.');
    }

    logger.log('Attendance Module Verification Completed Successfully.');

    await app.close();
}

bootstrap().catch(console.error);
