import { PrismaService } from '../../../../common/prisma/prisma.service';
import { EventBusService } from '../../../../core/events/event-bus.service';
import { AttendanceStateMachine } from '../../services/attendance-state-machine.service';
import { SubmitAttendanceCommand } from '../submit-attendance.command';
export declare class SubmitAttendanceHandler {
    private readonly prisma;
    private readonly stateMachine;
    private readonly eventBus;
    constructor(prisma: PrismaService, stateMachine: AttendanceStateMachine, eventBus: EventBusService);
    execute(command: SubmitAttendanceCommand): Promise<{
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
//# sourceMappingURL=submit-attendance.handler.d.ts.map