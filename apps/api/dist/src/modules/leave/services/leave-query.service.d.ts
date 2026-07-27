import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class LeaveQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getLeaveBalances(ctx: PlatformContext): Promise<({
        leaveType: {
            name: string;
            id: string;
            organizationId: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            isPaid: boolean;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        leaveTypeId: string;
        year: number;
        totalDays: import("@prisma/client/runtime/library").Decimal;
        usedDays: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    getPendingRequests(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        version: number;
        reason: string | null;
        startDate: Date;
        endDate: Date;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        leaveTypeId: string;
    }[]>;
}
//# sourceMappingURL=leave-query.service.d.ts.map