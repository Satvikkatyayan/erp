import { AttendanceQueryService } from '../services/attendance-query.service';
import { TimeMetrics, AttendanceMetrics, LeaveSummary, ProjectSiteSummary, AttendanceCalculationResult } from '../services/attendance-calculation.service';
export declare class PlatformAttendanceSDK {
    private readonly queryService;
    constructor(queryService: AttendanceQueryService);
    getAttendanceSummary(employeeId: string, payrollPeriodId: string): Promise<AttendanceCalculationResult>;
    getAttendanceMetrics(employeeId: string, payrollPeriodId: string): Promise<AttendanceMetrics>;
    getAttendanceHours(employeeId: string, payrollPeriodId: string): Promise<TimeMetrics>;
    getAttendanceLeaveSummary(employeeId: string, payrollPeriodId: string): Promise<LeaveSummary>;
    getAttendanceProjectSummary(employeeId: string, payrollPeriodId: string): Promise<ProjectSiteSummary>;
}
//# sourceMappingURL=platform-attendance.sdk.d.ts.map