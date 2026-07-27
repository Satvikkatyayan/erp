import { Injectable, Logger } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugins/scoring-plugin.interface';
import { GoalScoringPlugin } from './scoring-plugins/goal-scoring.plugin';
import { CompetencyScoringPlugin } from './scoring-plugins/competency-scoring.plugin';
import { KpiScoringPlugin } from './scoring-plugins/kpi-scoring.plugin';
import { AttendanceScoringPlugin } from './scoring-plugins/attendance-scoring.plugin';
import { LeaveScoringPlugin } from './scoring-plugins/leave-scoring.plugin';
import { NormalizationPlugin } from './scoring-plugins/normalization.plugin';
import { BonusScoringPlugin } from './scoring-plugins/bonus-scoring.plugin';

/**
 * Score Trace — Complete explainability record of a scoring execution.
 */
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

/**
 * Performance Scoring Engine
 * 
 * Plugin-based scoring architecture mirroring the Payroll Formula Engine.
 * Executes scoring plugins in order, accumulates weighted scores,
 * then normalizes. Fully deterministic — operates on snapshot data only.
 * 
 * Architecture:
 *   PerformanceScoringEngine
 *     ↓
 *   GoalPlugin → CompetencyPlugin → KPIPlugin → AttendancePlugin → LeavePlugin
 *     ↓
 *   NormalizationPlugin → BonusPlugin
 *     ↓
 *   ScoreTrace (explainability)
 */
@Injectable()
export class PerformanceScoringEngine {
  private readonly logger = new Logger(PerformanceScoringEngine.name);
  private readonly plugins: ScoringPlugin[];
  private readonly ENGINE_VERSION = '1.0.0';

  constructor(
    private readonly goalPlugin: GoalScoringPlugin,
    private readonly competencyPlugin: CompetencyScoringPlugin,
    private readonly kpiPlugin: KpiScoringPlugin,
    private readonly attendancePlugin: AttendanceScoringPlugin,
    private readonly leavePlugin: LeaveScoringPlugin,
    private readonly normalizationPlugin: NormalizationPlugin,
    private readonly bonusPlugin: BonusScoringPlugin,
  ) {
    // Register plugins in order
    this.plugins = [
      this.goalPlugin,
      this.competencyPlugin,
      this.kpiPlugin,
      this.attendancePlugin,
      this.leavePlugin,
      this.normalizationPlugin,
      this.bonusPlugin,
    ].sort((a, b) => a.order - b.order);
  }

  /**
   * Execute full scoring pipeline. Returns a deterministic ScoreTrace.
   * No database writes. No events. Pure evaluation.
   */
  async evaluate(ctx: ScoringContext): Promise<ScoreTrace> {
    this.logger.debug(`Evaluating performance for employee ${ctx.employeeId} in cycle ${ctx.cycleId}`);

    const steps: ScoringResult[] = [];
    let cumulativeWeightedTotal = 0;

    // Phase 1: Execute component plugins (Goal, Competency, KPI, Attendance, Leave)
    for (const plugin of this.plugins) {
      if (plugin.name === 'Normalization' || plugin.name === 'BonusRecommendation') continue;

      if (!plugin.isApplicable(ctx)) {
        this.logger.debug(`Plugin ${plugin.name} skipped (not applicable)`);
        continue;
      }

      const result = await plugin.evaluate(ctx);
      steps.push(result);
      cumulativeWeightedTotal += result.weightedScore;
    }

    // Phase 2: Normalization
    // Pass cumulative total to normalization plugin via snapshot data
    const normCtx: ScoringContext = {
      ...ctx,
      snapshotData: { ...ctx.snapshotData, _cumulativeWeightedTotal: cumulativeWeightedTotal },
    };

    const normResult = await this.normalizationPlugin.evaluate(normCtx);
    steps.push(normResult);
    const normalizedScore = normResult.weightedScore;

    // Phase 3: Bonus recommendation (post-processing, doesn't affect score)
    let bonusPct = 0;
    const bonusCtx: ScoringContext = {
      ...ctx,
      snapshotData: { ...ctx.snapshotData, _normalizedScore: normalizedScore },
    };

    if (this.bonusPlugin.isApplicable(bonusCtx)) {
      const bonusResult = await this.bonusPlugin.evaluate(bonusCtx);
      steps.push(bonusResult);
      bonusPct = bonusResult.metadata?.recommendedBonusPct ?? 0;
    }

    // Build trace
    const goalStep = steps.find(s => s.component === 'GoalScore');
    const competencyStep = steps.find(s => s.component === 'CompetencyScore');
    const kpiStep = steps.find(s => s.component === 'KPIScore');
    const attendanceStep = steps.find(s => s.component === 'AttendanceScore');
    const leaveStep = steps.find(s => s.component === 'LeaveScore');

    const trace: ScoreTrace = {
      steps,
      goalScore: goalStep?.rawScore ?? 0,
      competencyScore: competencyStep?.rawScore ?? 0,
      kpiScore: kpiStep?.rawScore ?? 0,
      attendanceScore: attendanceStep?.rawScore ?? 0,
      leaveScore: leaveStep?.rawScore ?? 0,
      weightedTotal: cumulativeWeightedTotal,
      normalizedScore,
      finalRating: normalizedScore,
      bonusRecommendationPct: bonusPct,
      engineVersion: this.ENGINE_VERSION,
    };

    this.logger.debug(`Score trace complete: final=${normalizedScore}, bonus=${bonusPct}%`);
    return trace;
  }

  /**
   * Simulation — identical to evaluate() but explicitly documented
   * as a dry-run. No DB writes. No events. No timeline. No audit.
   * Returns the full ScoreTrace for preview purposes.
   */
  async simulate(ctx: ScoringContext): Promise<ScoreTrace> {
    return this.evaluate(ctx);
  }

  /**
   * Apply forced distribution adjustment using Rules SDK.
   * Takes a batch of scores and adjusts them per distribution policy.
   * Returns adjusted scores without persisting.
   */
  applyForcedDistribution(
    scores: Array<{ employeeId: string; score: number }>,
    distributionPolicy: { top: number; middle: number; bottom: number },
  ): Array<{ employeeId: string; originalScore: number; adjustedScore: number; bucket: string }> {
    // Sort by score descending
    const sorted = [...scores].sort((a, b) => b.score - a.score);
    const total = sorted.length;

    const topCount = Math.round(total * (distributionPolicy.top / 100));
    const bottomCount = Math.round(total * (distributionPolicy.bottom / 100));

    return sorted.map((s, idx) => {
      let bucket: string;
      let adjustedScore = s.score;

      if (idx < topCount) {
        bucket = 'Top';
        adjustedScore = Math.max(s.score, 85); // Floor at 85 for top bucket
      } else if (idx >= total - bottomCount) {
        bucket = 'Bottom';
        adjustedScore = Math.min(s.score, 50); // Cap at 50 for bottom bucket
      } else {
        bucket = 'Middle';
      }

      return { employeeId: s.employeeId, originalScore: s.score, adjustedScore, bucket };
    });
  }
}
