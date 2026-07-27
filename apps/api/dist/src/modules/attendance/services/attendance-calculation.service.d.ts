import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { AttendanceSummaryRepository } from '../repositories/attendance-summary.repository';
export interface TimeMetrics {
    workedHours: number;
    grossWorkedHours: number;
    netWorkedHours: number;
    breakDuration: number;
    lateMinutes: number;
    earlyExitMinutes: number;
    overtimeHours: number;
    nightShiftHours: number;
    weekendHours: number;
    holidayHours: number;
    shiftCompliancePercentage: number;
}
export interface AttendanceMetrics {
    presentDays: number;
    absentDays: number;
    halfDays: number;
    paidLeaveDays: number;
    casualLeaveDays: number;
    compOffDays: number;
    trainingDays: number;
    businessTravelDays: number;
    holidayDays: number;
    weeklyOffDays: number;
    attendancePercentage: number;
    attendanceWeight: number;
}
export interface ExceptionMetrics {
    criticalExceptions: number;
    highPriorityExceptions: number;
    mediumPriorityExceptions: number;
    lowPriorityExceptions: number;
    resolvedExceptions: number;
    outstandingExceptions: number;
    reviewCompletionPercentage: number;
}
export interface LeaveSummary {
    approvedLeave: number;
    pendingLeave: number;
    rejectedLeave: number;
    leaveBalanceUsed: number;
    leaveTypes: Record<string, number>;
    leaveDuration: number;
}
export interface ProjectSiteSummary {
    workedSites: string[];
    workedProjects: string[];
    workedCostCenters: string[];
    daysPerSite: Record<string, number>;
    daysPerProject: Record<string, number>;
    hoursPerSite: Record<string, number>;
    hoursPerProject: Record<string, number>;
}
export interface AttendanceCalculationResult {
    employeeId: string;
    payrollPeriodId: string;
    version: number;
    generatedAt: Date;
    generatedById?: string;
    sourceMusterIds: string[];
    timeMetrics: TimeMetrics;
    attendanceMetrics: AttendanceMetrics;
    exceptionMetrics: ExceptionMetrics;
    leaveSummary: LeaveSummary;
    projectSiteSummary: ProjectSiteSummary;
    checksum: string;
}
export declare class AttendanceCalculationService {
    private readonly prisma;
    private readonly eventBus;
    private readonly summaryRepo;
    private readonly logger;
    constructor(prisma: PrismaService, eventBus: EventBusService, summaryRepo: AttendanceSummaryRepository);
    calculateSummary(employeeId: string, payrollPeriodId: string, generatedById?: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<AttendanceCalculationResult>;
    generateAndPersistSummary(employeeId: string, payrollPeriodId: string, generatedById?: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<{
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
}
//# sourceMappingURL=attendance-calculation.service.d.ts.map