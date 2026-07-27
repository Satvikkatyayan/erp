import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendanceDayRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        musterId: string;
        attendanceResult: import(".prisma/client").$Enums.AttendanceResult;
        shiftId: string | null;
        snapshottedDesignation: string | null;
        snapshottedDepartment: string | null;
        snapshottedReportingManager: string | null;
        workedHours: import("@prisma/client/runtime/library").Decimal;
        overtimeHours: import("@prisma/client/runtime/library").Decimal;
        lateMinutes: number;
        earlyExitMinutes: number;
        correctionStatus: import(".prisma/client").$Enums.AttendanceCorrectionStatus;
        validationStatus: import(".prisma/client").$Enums.AttendanceValidationStatus;
        lockStatus: import(".prisma/client").$Enums.AttendanceLockStatus;
    }>;
}
//# sourceMappingURL=attendance-day.repository.d.ts.map