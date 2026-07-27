import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceEvaluationService } from './performance-evaluation.service';
import { PerformanceLockingService } from './performance-locking.service';
import { PerformanceScoringEngine, ScoreTrace } from './performance-scoring.engine';
import { NineBoxService } from './nine-box.service';
import { PerformanceTimelineService } from './performance-timeline.service';
export declare class PerformanceCycleService {
    private readonly prisma;
    private readonly sdk;
    private readonly evaluationService;
    private readonly lockingService;
    private readonly scoringEngine;
    private readonly nineBoxService;
    private readonly timeline;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, evaluationService: PerformanceEvaluationService, lockingService: PerformanceLockingService, scoringEngine: PerformanceScoringEngine, nineBoxService: NineBoxService, timeline: PerformanceTimelineService);
    executeEvaluationCycle(ctx: any, cycleId: string): Promise<void>;
    finalizeCycle(ctx: any, cycleId: string): Promise<void>;
    simulateCycle(ctx: any, cycleId: string): Promise<Array<{
        employeeId: string;
        trace: ScoreTrace;
    }>>;
    private registerAnalyticsDatasets;
}
//# sourceMappingURL=performance-cycle.service.d.ts.map