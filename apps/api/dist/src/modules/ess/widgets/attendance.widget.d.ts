import { OnModuleInit } from '@nestjs/common';
import { IDashboardWidget, DashboardWidgetProvider } from './dashboard-widget.provider';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { AttendanceQueryService } from '../../attendance/services/attendance-query.service';
export declare class AttendanceWidget implements IDashboardWidget, OnModuleInit {
    private readonly provider;
    private readonly queryService;
    readonly widgetKey = "Attendance";
    constructor(provider: DashboardWidgetProvider, queryService: AttendanceQueryService);
    onModuleInit(): void;
    getData(ctx: PlatformContext): Promise<{
        type: string;
        title: string;
        data: {
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
        } | {
            status: string;
        };
    }>;
}
//# sourceMappingURL=attendance.widget.d.ts.map