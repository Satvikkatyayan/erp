import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Goal Scoring Plugin
 * 
 * Calculates weighted goal achievement score from snapshot data.
 * Each goal assignment has a weight and progress — the plugin computes
 * the weighted average of all goal completions.
 */
@Injectable()
export class GoalScoringPlugin implements ScoringPlugin {
  readonly name = 'GoalScore';
  readonly order = 10;

  isApplicable(_ctx: ScoringContext): boolean {
    return true; // Goals are always evaluated
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const goals = ctx.snapshotData?.goalAssignments || [];
    const goalProgress = ctx.snapshotData?.goalProgress || [];

    if (goals.length === 0) {
      return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No goals assigned' } };
    }

    let totalWeight = 0;
    let weightedAchievement = 0;

    for (const assignment of goals) {
      const progress = goalProgress.filter((p: any) => p.assignmentId === assignment.id);
      const latestProgress = progress.length > 0
        ? progress.reduce((a: any, b: any) => (a.recordedAt > b.recordedAt ? a : b))
        : null;

      const achievementPct = latestProgress
        ? Math.min((latestProgress.progressValue / (assignment.targetValue || 100)) * 100, 100)
        : 0;

      const goalWeight = assignment.weight || (1 / goals.length);
      totalWeight += goalWeight;
      weightedAchievement += achievementPct * goalWeight;
    }

    const rawScore = totalWeight > 0 ? weightedAchievement / totalWeight : 0;
    const configWeight = ctx.cycleConfig?.goalWeight ?? 0.4;

    return {
      component: this.name,
      rawScore,
      weight: configWeight,
      weightedScore: rawScore * configWeight,
      metadata: { goalCount: goals.length, totalWeight },
    };
  }
}
