import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class MissingCheckoutDetector implements IExceptionDetector {
  public readonly identifier = 'MissingCheckoutDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const sessions = await tx.attendanceSession.findMany({
      where: {
        attendanceDay: { musterId }
      },
      include: {
        punches: true,
        attendanceDay: true
      }
    });

    const results: ExceptionDetectionResult[] = [];

    for (const session of sessions) {
      const hasCheckIn = session.punches.some(p => p.punchType === 'IN');
      const hasCheckOut = session.punches.some(p => p.punchType === 'OUT');

      if (hasCheckIn && !hasCheckOut) {
        results.push({
          exceptionType: AttendanceExceptionType.MISSING_CHECKOUT,
          severity: AttendanceExceptionSeverity.MEDIUM,
          priority: 60,
          description: `Missing check-out punch for session.`,
          recommendedAction: 'Manually verify departure time and add missing punch.',
          attendanceDayId: session.attendanceDayId,
          employeeId: session.attendanceDay.employeeId
        });
      }
    }

    return results;
  }
}
