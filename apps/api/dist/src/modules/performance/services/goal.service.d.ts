import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceTimelineService } from './performance-timeline.service';
export declare class GoalService {
    private readonly prisma;
    private readonly sdk;
    private readonly timeline;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, timeline: PerformanceTimelineService);
    createGoal(ctx: any, data: {
        title: string;
        description?: string;
        category?: string;
        parentGoalId?: string;
    }): Promise<any>;
    createNewVersion(ctx: any, currentGoalId: string, updates: {
        title?: string;
        description?: string;
        category?: string;
    }): Promise<any>;
    assignGoal(ctx: any, data: {
        cycleId: string;
        employeeId: string;
        goalId: string;
        weight?: number;
        targetValue?: number;
    }): Promise<any>;
    recordProgress(ctx: any, assignmentId: string, progressValue: number, note?: string): Promise<any>;
}
//# sourceMappingURL=goal.service.d.ts.map