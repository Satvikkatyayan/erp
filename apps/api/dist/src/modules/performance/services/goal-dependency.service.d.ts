import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class GoalDependencyService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    addDependency(ctx: any, data: {
        goalId: string;
        dependsOnGoalId: string;
        dependencyType?: string;
    }): Promise<any>;
    getDependencyTree(tenantId: string, goalId: string, depth?: number): Promise<any[]>;
    getUpstreamDependencies(tenantId: string, goalId: string): Promise<any[]>;
    private detectCycle;
}
//# sourceMappingURL=goal-dependency.service.d.ts.map