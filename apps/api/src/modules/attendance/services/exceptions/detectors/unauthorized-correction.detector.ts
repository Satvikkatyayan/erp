import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class UnauthorizedCorrectionDetector implements IExceptionDetector {
  public readonly identifier = 'UnauthorizedCorrectionDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { musterTimelines: true, attendanceDays: true }
    });

    if (!muster) return [];

    const results: ExceptionDetectionResult[] = [];

    // Simple policy check: Any attendance day in LOCKED status that has a recently modified updated_at timestamp without a CORRECTION_APPROVED timeline event
    // For this demonstration, we look for attendance Days with CORRECTION_REQUESTED but the muster is not UNDER_REVIEW or REOPENED
    for (const day of muster.attendanceDays) {
      if (day.correctionStatus === 'REQUESTED' && (muster.workflowStatus === 'LOCKED' || muster.workflowStatus === 'SUBMITTED')) {
        results.push({
          exceptionType: AttendanceExceptionType.UNAUTHORIZED_CORRECTION,
          severity: AttendanceExceptionSeverity.CRITICAL,
          priority: 100,
          description: `Correction attempted on locked/submitted muster without authorization workflow.`,
          recommendedAction: 'Revert correction or formally reopen the muster.',
          attendanceDayId: day.id,
          employeeId: day.employeeId
        });
      }
    }

    return results;
  }
}
