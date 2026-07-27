import { PrismaService } from '../../../common/prisma/prisma.service';
import { AttendanceSummaryRepository } from '../repositories/attendance-summary.repository';
export declare class AttendanceQueryService {
    private readonly prisma;
    private readonly summaryRepo;
    private readonly logger;
    constructor(prisma: PrismaService, summaryRepo: AttendanceSummaryRepository);
    getAttendanceSummary(employeeId: string, payrollPeriodId: string): Promise<{
        id: string;
        employeeId: string;
        payrollPeriodId: string;
        version: number;
        generatedAt: Date;
        generatedById: string | null;
        timeMetrics: import("@prisma/client/runtime/library").JsonValue;
        attendanceMetrics: import("@prisma/client/runtime/library").JsonValue;
        exceptionMetrics: import("@prisma/client/runtime/library").JsonValue;
        leaveSummary: import("@prisma/client/runtime/library").JsonValue;
        projectSiteSummary: import("@prisma/client/runtime/library").JsonValue;
        sourceMusterIds: string[];
        checksum: string | null;
    }>;
    getAttendanceMetrics(employeeId: string, payrollPeriodId: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getAttendanceHours(employeeId: string, payrollPeriodId: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getLeaveSummary(employeeId: string, payrollPeriodId: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getProjectSummary(employeeId: string, payrollPeriodId: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getSiteSummary(employeeId: string, payrollPeriodId: string): Promise<import("@prisma/client/runtime/library").JsonValue>;
    getTodaySummary(ctx: any): Promise<{
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
    getHistory(ctx: any, limit?: number): Promise<{
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
    }[]>;
}
//# sourceMappingURL=attendance-query.service.d.ts.map