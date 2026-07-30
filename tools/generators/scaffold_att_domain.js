const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, 'apps', 'api', 'src', 'modules', 'attendance');
const dirs = [
    '',
    'controllers',
    'commands',
    'queries',
    'events',
    'services',
    'validators',
    'repositories',
];

dirs.forEach(dir => {
    fs.mkdirSync(path.join(baseDir, dir), { recursive: true });
});

const moduleFile = `import { Module } from '@nestjs/common';
import { AttendanceLifecycleService } from './services/attendance-lifecycle.service';
import { AttendanceCalculationService } from './services/attendance-calculation.service';
import { AttendanceTimelineService } from './services/attendance-timeline.service';
import { ShiftService } from './services/shift.service';

@Module({
  providers: [
    AttendanceLifecycleService,
    AttendanceCalculationService,
    AttendanceTimelineService,
    ShiftService,
  ],
  exports: [
    AttendanceLifecycleService,
  ]
})
export class AttendanceModule {}
`;
fs.writeFileSync(path.join(baseDir, 'attendance.module.ts'), moduleFile);

const lifecycleFile = `import { Injectable, Logger } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { v4 as uuidv4 } from 'uuid';
import { AttendanceTimelineService } from './attendance-timeline.service';

@Injectable()
export class AttendanceLifecycleService {
  private readonly logger = new Logger(AttendanceLifecycleService.name);

  constructor(
    private readonly sdk: PlatformSDK,
    private readonly prisma: PrismaService,
    private readonly timeline: AttendanceTimelineService
  ) {}

  async ingestPunch(ctx: PlatformContext, employeeId: string, punchData: { timestamp: Date, punchType: string, sourceId: string }) {
    // 1. Resolve AttendanceDay based on Shift logic (accounting for overnight shifts)
    // If punch is 02:00 AM but shift started at 22:00 yesterday, it belongs to yesterday's AttendanceDay.
    const date = punchData.timestamp; // Simplified for scaffolding
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    let day = await this.prisma.attAttendanceDay.findFirst({
        where: { employeeId, date: dateOnly, tenantId: ctx.tenantId }
    });

    if (!day) {
        day = await this.prisma.attAttendanceDay.create({
            data: {
                tenantId: ctx.tenantId,
                organizationId: ctx.organizationId,
                employeeId,
                date: dateOnly,
                status: 'Draft',
                validationStatus: 'Valid'
            }
        });
    }

    // 2. Find or Create open session
    let session = await this.prisma.attAttendanceSession.findFirst({
        where: { attendanceDayId: day.id, sessionEnd: null }
    });

    if (!session && punchData.punchType === 'IN') {
        session = await this.prisma.attAttendanceSession.create({
            data: {
                tenantId: ctx.tenantId,
                attendanceDayId: day.id,
                sessionStart: punchData.timestamp,
                sessionType: 'Work'
            }
        });
    }

    if (!session) throw new Error("No open session to punch OUT of.");

    // 3. Record Punch
    const punch = await this.prisma.attAttendancePunch.create({
        data: {
            tenantId: ctx.tenantId,
            sessionId: session.id,
            sourceId: punchData.sourceId,
            timestamp: punchData.timestamp,
            punchType: punchData.punchType
        }
    });

    if (punchData.punchType === 'OUT') {
        await this.prisma.attAttendanceSession.update({
            where: { id: session.id },
            data: { sessionEnd: punchData.timestamp }
        });
        await this.sdk.events.publish(ctx, 'AttendanceCheckedOut', { employeeId, date: dateOnly });
    } else if (punchData.punchType === 'IN') {
        await this.sdk.events.publish(ctx, 'AttendanceCheckedIn', { employeeId, date: dateOnly });
    }

    await this.timeline.recordEvent(ctx, day.id, 'Punch', \`Punch \${punchData.punchType} recorded\`);
    
    return punch;
  }

  async markLossOfPay(ctx: PlatformContext, employeeId: string, date: Date, units: number, reason: string) {
    const dateOnly = new Date(date);
    dateOnly.setHours(0, 0, 0, 0);

    let day = await this.prisma.attAttendanceDay.findFirst({
        where: { employeeId, date: dateOnly, tenantId: ctx.tenantId }
    });

    if (!day) {
        day = await this.prisma.attAttendanceDay.create({
            data: {
                tenantId: ctx.tenantId,
                organizationId: ctx.organizationId,
                employeeId,
                date: dateOnly,
                status: 'Draft',
                validationStatus: 'Valid',
                lopUnits: units,
                lopReason: reason,
                isPayableDay: false
            }
        });
    } else {
        await this.prisma.attAttendanceDay.update({
            where: { id: day.id },
            data: {
                lopUnits: units,
                lopReason: reason,
                isPayableDay: false
            }
        });
    }

    // Publish event for Payroll module
    await this.sdk.events.publish(ctx, 'LossOfPayRecorded', {
        employeeId,
        date: dateOnly,
        lopUnits: units,
        reason
    });

    return day;
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'attendance-lifecycle.service.ts'), lifecycleFile);

const timelineFile = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class AttendanceTimelineService {
  constructor(private readonly prisma: PrismaService) {}

  async recordEvent(ctx: PlatformContext, attendanceDayId: string, eventType: string, description: string) {
    await this.prisma.attAttendanceTimeline.create({
        data: {
            tenantId: ctx.tenantId,
            attendanceDayId,
            eventType,
            description,
            actorId: ctx.userId
        }
    });
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'attendance-timeline.service.ts'), timelineFile);

const calculationFile = `import { Injectable } from '@nestjs/common';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';

@Injectable()
export class AttendanceCalculationService {
  constructor(private readonly sdk: PlatformSDK) {}
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'attendance-calculation.service.ts'), calculationFile);

const shiftFile = `import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';

@Injectable()
export class ShiftService {
  constructor(private readonly prisma: PrismaService) {}

  async assignShift(ctx: PlatformContext, employeeId: string, templateId: string, effectiveFrom: Date, effectiveTo?: Date) {
      return this.prisma.attShiftAssignment.create({
          data: {
              tenantId: ctx.tenantId,
              employeeId,
              shiftTemplateId: templateId,
              effectiveFrom,
              effectiveTo
          }
      });
  }
}
`;
fs.writeFileSync(path.join(baseDir, 'services', 'shift.service.ts'), shiftFile);

console.log('Attendance module scaffolded successfully.');
