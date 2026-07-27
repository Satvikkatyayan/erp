import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { AttendanceHealthEvent } from '../events/attendance-exception.events';
import { AttendanceExceptionStatus } from '@prisma/client';

@Injectable()
export class AttendanceHealthService {
  private readonly logger = new Logger(AttendanceHealthService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventBus: EventBusService
  ) {}

  async updateMusterHealth(musterId: string, correlationId: string, prismaTx?: any) {
    const db = prismaTx || this.prisma;
    
    // Calculate KPIs
    const exceptions = await db.attendanceException.findMany({
      where: { musterId, status: { notIn: [AttendanceExceptionStatus.RESOLVED, AttendanceExceptionStatus.DISMISSED] } }
    });

    const muster = await db.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: {
        snapshot: { include: { assignments: true } }
      }
    });

    if (!muster) return;

    // Calculate pending attendance
    const expected = muster.snapshot?.assignments.length || 0;
    // Assuming attendanceDay counts exist, mock for this example
    const recorded = muster.attendanceRecorded; 
    const pending = Math.max(0, expected - recorded);
    const completionPct = expected > 0 ? (recorded / expected) * 100 : 0;

    await db.dailySiteMuster.update({
      where: { id: musterId },
      data: {
        employeesExpected: expected,
        pendingAttendance: pending,
        completionPercentage: completionPct
      }
    });

    this.eventBus.publish(new AttendanceHealthEvent(
      'AttendanceHealthChanged',
      correlationId,
      {
        musterId,
        siteId: muster.siteId,
        completionPercentage: completionPct,
        pendingExceptions: exceptions.length
      }
    ));
  }
}
