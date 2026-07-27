import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceSnapshotService } from './performance-snapshot.service';
import { RatingService } from './rating.service';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
import { CalibrationService } from './calibration.service';
import { NineBoxService } from './nine-box.service';
import { DevelopmentRecommendationService } from './development-recommendation.service';
import { ReviewSnapshotService } from './review-snapshot.service';
import { PerformanceTimelineService } from './performance-timeline.service';
export declare class PerformanceEvaluationService {
    private readonly prisma;
    private readonly sdk;
    private readonly snapshotService;
    private readonly ratingService;
    private readonly scoringEngine;
    private readonly calibrationService;
    private readonly nineBoxService;
    private readonly devRecommendationService;
    private readonly reviewSnapshotService;
    private readonly timeline;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, snapshotService: PerformanceSnapshotService, ratingService: RatingService, scoringEngine: PerformanceScoringEngine, calibrationService: CalibrationService, nineBoxService: NineBoxService, devRecommendationService: DevelopmentRecommendationService, reviewSnapshotService: ReviewSnapshotService, timeline: PerformanceTimelineService);
    evaluateEmployee(ctx: any, cycleId: string, employeeId: string): Promise<{
        snapshot: any;
        rating: any;
        trace: ScoreTrace;
    }>;
    simulateEvaluation(ctx: any, cycleId: string, employeeId: string): Promise<ScoreTrace>;
    processNineBox(ctx: any, cycleId: string, employeeId: string): Promise<any>;
    processCalibration(ctx: any, ratingId: string, calibratedScore: number, stage: string, reason?: string): Promise<any>;
}
//# sourceMappingURL=performance-evaluation.service.d.ts.map