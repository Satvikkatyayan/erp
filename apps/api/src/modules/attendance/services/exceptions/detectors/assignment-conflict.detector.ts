import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class AssignmentConflictDetector implements IExceptionDetector {
  public readonly identifier = 'AssignmentConflictDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { snapshot: true, attendanceDays: true }
    });

    if (!muster || !muster.snapshot || !muster.snapshot.snapshotData) return [];

    const snapshotData = muster.snapshot.snapshotData as any;
    const expectedEmployees: any[] = Array.isArray(snapshotData) ? snapshotData : (snapshotData.assignments || []);
    const expectedIds = new Set(expectedEmployees.map(e => e.employeeId));

    const results: ExceptionDetectionResult[] = [];

    for (const day of muster.attendanceDays) {
      if (!expectedIds.has(day.employeeId)) {
        results.push({
          exceptionType: AttendanceExceptionType.UNASSIGNED_EMPLOYEE,
          severity: AttendanceExceptionSeverity.CRITICAL,
          priority: 95,
          description: `Attendance recorded for an employee not assigned to this site in the snapshot.`,
          recommendedAction: 'Verify deployment status with HR. This record may be invalid.',
          attendanceDayId: day.id,
          employeeId: day.employeeId
        });
      }
    }

    return results;
  }
}
