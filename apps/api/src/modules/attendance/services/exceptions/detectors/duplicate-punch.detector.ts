import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class DuplicatePunchDetector implements IExceptionDetector {
  public readonly identifier = 'DuplicatePunchDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const sessions = await tx.attendanceSession.findMany({
      where: { attendanceDay: { musterId } },
      include: { punches: true, attendanceDay: true }
    });

    const results: ExceptionDetectionResult[] = [];

    for (const session of sessions) {
      const checkIns = session.punches.filter(p => p.punchType === 'IN');
      const checkOuts = session.punches.filter(p => p.punchType === 'OUT');

      if (checkIns.length > 1 || checkOuts.length > 1) {
        results.push({
          exceptionType: AttendanceExceptionType.DUPLICATE_PUNCH,
          severity: AttendanceExceptionSeverity.MEDIUM,
          priority: 50,
          description: `Multiple identical punches detected in the same session (${checkIns.length} Check-Ins, ${checkOuts.length} Check-Outs).`,
          recommendedAction: 'Review punch logs and mark duplicates as invalid.',
          attendanceDayId: session.attendanceDayId,
          employeeId: session.attendanceDay.employeeId
        });
      }
    }

    return results;
  }
}
