import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
export declare class RatingService {
    private readonly prisma;
    private readonly sdk;
    private readonly scoringEngine;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, scoringEngine: PerformanceScoringEngine);
    generateRating(ctx: any, cycleId: string, employeeId: string, snapshotData: any): Promise<{
        rating: any;
        trace: ScoreTrace;
    }>;
    private getLabelForScore;
}
//# sourceMappingURL=rating.service.d.ts.map