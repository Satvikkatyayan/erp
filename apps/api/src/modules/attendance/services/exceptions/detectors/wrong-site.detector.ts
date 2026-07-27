import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../../../common/prisma/prisma.service';
import { IExceptionDetector, ExceptionDetectionResult } from '../exception-detector.interface';
import { AttendanceExceptionType, AttendanceExceptionSeverity } from '@prisma/client';

@Injectable()
export class WrongSiteDetector implements IExceptionDetector {
  public readonly identifier = 'WrongSiteDetector';

  async detect(musterId: string, tx: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<ExceptionDetectionResult[]> {
    const muster = await tx.dailySiteMuster.findUnique({
      where: { id: musterId },
      include: { snapshot: true, attendanceDays: true }
    });

    if (!muster || !muster.snapshot || !muster.snapshot.snapshotData) return [];

    // The current logic determines site assignment by snapshot. 
    // If the punch coordinates (if available) were far from site coordinates, this would trigger.
    // For now, if the employee was expected at Site A but marks attendance at Site B.
    // Since this detector runs on Site B's muster, AssignmentConflict handles the assignment aspect.
    // If we have actual punch locations mapped against site geo-fences, we'd check it here.
    
    // We will do a mock-up using punch source metadata if it were available, or just check snapshot mismatch as proxy.
    const snapshotData = muster.snapshot.snapshotData as any;
    const expectedEmployees: any[] = Array.isArray(snapshotData) ? snapshotData : (snapshotData.assignments || []);
    const expectedSiteMap = new Map(expectedEmployees.map(e => [e.employeeId, e.siteId || muster.siteId]));

    const results: ExceptionDetectionResult[] = [];

    for (const day of muster.attendanceDays) {
      const assignedSiteId = expectedSiteMap.get(day.employeeId);
      if (assignedSiteId && assignedSiteId !== muster.siteId) {
        results.push({
          exceptionType: AttendanceExceptionType.WRONG_SITE,
          severity: AttendanceExceptionSeverity.HIGH,
          priority: 90,
          description: `Employee marked attendance at Site B but is assigned to Site A.`,
          recommendedAction: 'Cross-check transfer requests or reject attendance.',
          attendanceDayId: day.id,
          employeeId: day.employeeId
        });
      }
    }

    return results;
  }
}
