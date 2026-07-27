import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class ShiftViolationDetector implements IExceptionDetector {
  public readonly identifier = 'ShiftViolationDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { attendanceDays: true }
    });

    if (!muster) return [];

    const results: ExceptionDetectionResult[] = [];

    for (const day of muster.attendanceDays) {
      if (day.lateMinutes > 0 || day.earlyExitMinutes > 0) {
        results.push({
          exceptionType: AttendanceExceptionType.SHIFT_VIOLATION,
          severity: AttendanceExceptionSeverity.LOW,
          priority: 30,
          description: `Shift violation: Late by ${day.lateMinutes} mins, Early Exit by ${day.earlyExitMinutes} mins.`,
          recommendedAction: 'Deduct leave/pay per policy if unapproved.',
          attendanceDayId: day.id,
          employeeId: day.employeeId
        });
      }
    }

    return results;
  }
}
