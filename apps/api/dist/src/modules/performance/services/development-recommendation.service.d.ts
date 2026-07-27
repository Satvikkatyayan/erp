import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class DevelopmentRecommendationService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    generateRecommendations(ctx: any, cycleId: string, employeeId: string): Promise<any[]>;
    private assessPriority;
    private suggestActionType;
}
//# sourceMappingURL=development-recommendation.service.d.ts.map