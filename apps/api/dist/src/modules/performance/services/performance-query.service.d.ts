import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class PerformanceQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getActiveGoals(ctx: PlatformContext): Promise<({
        goal: {
            id: string;
            tenantId: string;
            description: string | null;
            versionNumber: number;
            title: string;
            category: string | null;
            parentGoalId: string | null;
            isActive: boolean;
        };
    } & {
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        cycleId: string;
        goalId: string;
        weight: number;
        targetValue: number | null;
    })[]>;
    getPendingReviews(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        cycleId: string;
        finalRatingId: string | null;
        templateVersionId: string | null;
    }[]>;
}
//# sourceMappingURL=performance-query.service.d.ts.map