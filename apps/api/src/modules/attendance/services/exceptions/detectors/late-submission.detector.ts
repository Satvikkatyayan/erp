import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity, MusterWorkflowStatus } from '@prisma/client';

@Injectable()
export class LateSubmissionDetector implements IExceptionDetector {
  public readonly identifier = 'LateSubmissionDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { musterTimelines: true }
    });

    if (!muster) return [];

    // Find submission time from timeline
    const submissionEvent = muster.musterTimelines?.find(t => t.action === 'AttendanceSubmitted' || t.currentState === MusterWorkflowStatus.SUBMITTED);
    
    const results: ExceptionDetectionResult[] = [];
    
    // Assuming policy: MUST submit by 10 AM on the day after the muster.
    // For simplicity, we just check if submission was > 24 hours after musterDate.
    if (submissionEvent) {
      const submittedAt = new Date(submissionEvent.timestamp);
      const limit = new Date(muster.musterDate);
      limit.setDate(limit.getDate() + 1);
      limit.setHours(10, 0, 0, 0); // 10 AM next day

      if (submittedAt > limit) {
        results.push({
          exceptionType: AttendanceExceptionType.LATE_SUBMISSION,
          severity: AttendanceExceptionSeverity.MEDIUM,
          priority: 50,
          description: `Muster was submitted late at ${submittedAt.toISOString()} (Policy: Next day 10 AM).`,
          recommendedAction: 'Discuss with Site Clerk regarding delay.'
        });
      }
    }

    return results;
  }
}
