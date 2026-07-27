import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class DailySiteMusterRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        shiftId: string | null;
        siteId: string;
        projectId: string;
        musterDate: Date;
        siteClerkId: string | null;
        projectManagerId: string | null;
        snapshotId: string | null;
        employeesExpected: number;
        attendanceRecorded: number;
        pendingAttendance: number;
        completionPercentage: import("@prisma/client/runtime/library").Decimal;
        presentCount: number;
        absentCount: number;
        lateCount: number;
        halfDayCount: number;
        leaveCount: number;
        overtimeCount: number;
        correctedCount: number;
        reviewedCount: number;
        lockedCount: number;
        workflowStatus: import(".prisma/client").$Enums.MusterWorkflowStatus;
        draftSavedAt: Date | null;
    }>;
}
//# sourceMappingURL=daily-site-muster.repository.d.ts.map