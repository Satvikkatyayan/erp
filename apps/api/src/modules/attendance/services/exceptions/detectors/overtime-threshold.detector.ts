import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class OvertimeThresholdDetector implements IExceptionDetector {
  public readonly identifier = 'OvertimeThresholdDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { attendanceDays: true }
    });

    if (!muster) return [];

    const results: ExceptionDetectionResult[] = [];
    const MAX_OT_HOURS_PER_DAY = 4;

    for (const day of muster.attendanceDays) {
      if (day.overtimeHours && Number(day.overtimeHours) > MAX_OT_HOURS_PER_DAY) {
        results.push({
          exceptionType: AttendanceExceptionType.OVERTIME_THRESHOLD,
          severity: AttendanceExceptionSeverity.MEDIUM,
          priority: 40,
          description: `Employee recorded ${day.overtimeHours} hours of OT, exceeding the daily limit of ${MAX_OT_HOURS_PER_DAY} hours.`,
          recommendedAction: 'Requires PM/HR approval for excess OT.',
          attendanceDayId: day.id,
          employeeId: day.employeeId
        });
      }
    }

    return results;
  }
}
