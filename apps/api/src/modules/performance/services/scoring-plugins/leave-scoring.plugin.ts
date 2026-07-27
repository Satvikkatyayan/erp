import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Leave Scoring Plugin
 * 
 * Optional plugin — only active when PERF_INCLUDE_LEAVE feature flag is enabled.
 * Evaluates leave utilization from the snapshot (never reads Leave module directly).
 * Penalizes excessive unplanned leave while treating planned leave as neutral.
 */
@Injectable()
export class LeaveScoringPlugin implements ScoringPlugin {
  readonly name = 'LeaveScore';
  readonly order = 50;

  isApplicable(ctx: ScoringContext): boolean {
    return ctx.featureFlags['PERF_INCLUDE_LEAVE'] === true
      && ctx.snapshotData?.leaveIncluded === true;
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const metrics = ctx.snapshotData?.leaveMetrics;

    if (!metrics) {
      return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No leave data in snapshot' } };
    }

    // Planned leave is neutral; only unplanned/unauthorized leave reduces score
    const unplannedDays = metrics.unplannedLeaveDays || 0;
    const maxUnplannedThreshold = metrics.maxUnplannedThreshold || 5;

    // Score: 100 minus penalty for unplanned leave (20 points per day over threshold, capped)
    const penalty = Math.max(0, unplannedDays - maxUnplannedThreshold) * 20;
    const rawScore = Math.max(0, 100 - penalty);
    const configWeight = ctx.cycleConfig?.leaveWeight ?? 0.05;

    return {
      component: this.name,
      rawScore,
      weight: configWeight,
      weightedScore: rawScore * configWeight,
      metadata: {
        plannedLeaveDays: metrics.plannedLeaveDays || 0,
        unplannedLeaveDays: unplannedDays,
        totalLeaveDays: metrics.totalLeaveDays || 0,
      },
    };
  }
}
