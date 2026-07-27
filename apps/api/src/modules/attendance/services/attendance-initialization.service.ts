import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { SnapshotEmployeeData } from './attendance-snapshot.service';
import { 
  AttendanceResult, 
  AttendanceCorrectionStatus, 
  AttendanceValidationStatus, 
  AttendanceLockStatus 
} from '@prisma/client';

@Injectable()
export class AttendanceInitializationService {
  constructor(private readonly prisma: PrismaService) {}

  async initializeAggregate(
    musterId: string, 
    snapshotData: SnapshotEmployeeData[], 
    shiftId: string | null,
    prismaTx?: any
  ) {
    const db = prismaTx || this.prisma;
    const employeeCount = snapshotData.length;

    // 1. Generate AttendanceDay for every employee
    const attendanceDaysData = snapshotData.map(emp => ({
      musterId,
      employeeId: emp.employeeId,
      attendanceResult: AttendanceResult.ABSENT, // Default initialization
      shiftId: shiftId,
      version: 1,
      snapshottedDesignation: emp.designationName,
      snapshottedDepartment: emp.departmentName,
      snapshottedReportingManager: emp.reportingManagerId,
      workedHours: 0,
      overtimeHours: 0,
      lateMinutes: 0,
      earlyExitMinutes: 0,
      correctionStatus: AttendanceCorrectionStatus.NONE,
      validationStatus: AttendanceValidationStatus.PENDING,
      lockStatus: AttendanceLockStatus.UNLOCKED
    }));

    await db.attendanceDay.createMany({
      data: attendanceDaysData
    });

    // 2. Aggregate KPIs update
    const updatedMuster = await db.dailySiteMuster.update({
      where: { id: musterId },
      data: {
        employeesExpected: employeeCount,
        pendingAttendance: employeeCount,
        attendanceRecorded: 0,
        presentCount: 0,
        absentCount: employeeCount,
        lateCount: 0,
        halfDayCount: 0,
        leaveCount: 0,
        overtimeCount: 0,
        completionPercentage: 0
      }
    });

    return updatedMuster;
  }
}
