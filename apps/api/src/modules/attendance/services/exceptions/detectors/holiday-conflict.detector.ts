import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class HolidayConflictDetector implements IExceptionDetector {
  public readonly identifier = 'HolidayConflictDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { attendanceDays: true }
    });

    if (!muster) return [];
    
    // In real implementation, query CalendarService to check if muster.musterDate is a holiday for this site
    const isHoliday = false; // Mocked calendar check

    const results: ExceptionDetectionResult[] = [];

    if (isHoliday) {
      for (const day of muster.attendanceDays) {
        if (day.attendanceResult === 'PRESENT') {
          results.push({
            exceptionType: AttendanceExceptionType.HOLIDAY_CONFLICT,
            severity: AttendanceExceptionSeverity.LOW,
            priority: 20,
            description: `Employee marked present on a declared Holiday/Weekly Off.`,
            recommendedAction: 'Verify if compensatory off or overtime is applicable.',
            attendanceDayId: day.id,
            employeeId: day.employeeId
          });
        }
      }
    }

    return results;
  }
}
