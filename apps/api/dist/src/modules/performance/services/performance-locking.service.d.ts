import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceTimelineService } from './performance-timeline.service';
export declare class PerformanceLockingService {
    private readonly prisma;
    private readonly sdk;
    private readonly timeline;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, timeline: PerformanceTimelineService);
    lockScope(ctx: any, cycleId: string, scope: {
        level: 'EMPLOYEE' | 'DEPARTMENT' | 'CYCLE' | 'ORGANIZATION';
        targetId?: string;
    }): Promise<void>;
    isLocked(lockedScopes: any, employeeId: string, departmentId?: string): boolean;
    reopenReview(ctx: any, reviewId: string, reason: string): Promise<any>;
    unlockScope(ctx: any, cycleId: string, scope: {
        level: string;
        targetId?: string;
    }): Promise<void>;
}
//# sourceMappingURL=performance-locking.service.d.ts.map