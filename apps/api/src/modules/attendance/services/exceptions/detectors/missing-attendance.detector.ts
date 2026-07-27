import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class MissingAttendanceDetector implements IExceptionDetector {
  public readonly identifier = 'MissingAttendanceDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { snapshot: true, attendanceDays: true }
    });

    if (!muster || !muster.snapshot || !muster.snapshot.snapshotData) return [];

    const snapshotData = muster.snapshot.snapshotData as any;
    const expectedEmployees: any[] = Array.isArray(snapshotData) ? snapshotData : (snapshotData.assignments || []);
    
    if (expectedEmployees.length === 0) return [];

    const recordedEmployeeIds = new Set(muster.attendanceDays.map(d => d.employeeId));
    const results: ExceptionDetectionResult[] = [];

    for (const emp of expectedEmployees) {
      if (!recordedEmployeeIds.has(emp.employeeId)) {
        results.push({
          exceptionType: AttendanceExceptionType.MISSING_ATTENDANCE,
          severity: AttendanceExceptionSeverity.HIGH,
          priority: 80,
          description: `Employee ${emp.employeeName || emp.employeeId} was assigned to this site but has no attendance recorded.`,
          recommendedAction: 'Verify with Site Clerk if employee was present. Record attendance if yes, else mark absent.',
          employeeId: emp.employeeId
        });
      }
    }

    return results;
  }
}
