import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendanceSummaryRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findLatestByEmployeeAndPeriod(employeeId: string, payrollPeriodId: string, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<{
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
    save(data: any, tx?: Omit<PrismaService, '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends' | 'onModuleInit' | 'onModuleDestroy'>): Promise<{
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
//# sourceMappingURL=attendance-summary.repository.d.ts.map