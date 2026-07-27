import { ScoringContext, ScoringResult } from './scoring-plugins/scoring-plugin.interface';
import { GoalScoringPlugin } from './scoring-plugins/goal-scoring.plugin';
import { CompetencyScoringPlugin } from './scoring-plugins/competency-scoring.plugin';
import { KpiScoringPlugin } from './scoring-plugins/kpi-scoring.plugin';
import { AttendanceScoringPlugin } from './scoring-plugins/attendance-scoring.plugin';
import { LeaveScoringPlugin } from './scoring-plugins/leave-scoring.plugin';
import { NormalizationPlugin } from './scoring-plugins/normalization.plugin';
import { BonusScoringPlugin } from './scoring-plugins/bonus-scoring.plugin';
export interface ScoreTrace {
    steps: ScoringResult[];
    goalScore: number;
    competencyScore: number;
    kpiScore: number;
    attendanceScore: number;
    leaveScore: number;
    weightedTotal: number;
    normalizedScore: number;
    finalRating: number;
    bonusRecommendationPct: number;
    engineVersion: string;
}
export declare class PerformanceScoringEngine {
    private readonly goalPlugin;
    private readonly competencyPlugin;
    private readonly kpiPlugin;
    private readonly attendancePlugin;
    private readonly leavePlugin;
    private readonly normalizationPlugin;
    private readonly bonusPlugin;
    private readonly logger;
    private readonly plugins;
    private readonly ENGINE_VERSION;
    constructor(goalPlugin: GoalScoringPlugin, competencyPlugin: CompetencyScoringPlugin, kpiPlugin: KpiScoringPlugin, attendancePlugin: AttendanceScoringPlugin, leavePlugin: LeaveScoringPlugin, normalizationPlugin: NormalizationPlugin, bonusPlugin: BonusScoringPlugin);
    evaluate(ctx: ScoringContext): Promise<ScoreTrace>;
    simulate(ctx: ScoringContext): Promise<ScoreTrace>;
    applyForcedDistribution(scores: Array<{
        employeeId: string;
        score: number;
    }>, distributionPolicy: {
        top: number;
        middle: number;
        bottom: number;
    }): Array<{
        employeeId: string;
        originalScore: number;
        adjustedScore: number;
        bucket: string;
    }>;
}
//# sourceMappingURL=performance-scoring.engine.d.ts.map