import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Competency Scoring Plugin
 * 
 * Calculates average competency rating from multi-rater assessments
 * captured in the snapshot. Uses targetLevel vs currentLevel for
 * gap-aware scoring.
 */
@Injectable()
export class CompetencyScoringPlugin implements ScoringPlugin {
  readonly name = 'CompetencyScore';
  readonly order = 20;

  isApplicable(_ctx: ScoringContext): boolean {
    return true; // Competencies are always evaluated
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const assignments = ctx.snapshotData?.competencyAssignments || [];
    const ratings = ctx.snapshotData?.competencyRatings || [];

    if (assignments.length === 0) {
      return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No competencies assigned' } };
    }

    let totalScore = 0;
    let count = 0;

    for (const assignment of assignments) {
      const competencyRatings = ratings.filter((r: any) => r.competencyId === assignment.competencyId);
      if (competencyRatings.length > 0) {
        // Average all rater scores for this competency
        const avgRating = competencyRatings.reduce((sum: number, r: any) => sum + r.rating, 0) / competencyRatings.length;
        // Scale: rating as percentage of target level (capped at 100%)
        const targetLevel = assignment.targetLevel || 5;
        const pctOfTarget = Math.min((avgRating / targetLevel) * 100, 100);
        totalScore += pctOfTarget;
        count++;
      }
    }

    const rawScore = count > 0 ? totalScore / count : 0;
    const configWeight = ctx.cycleConfig?.competencyWeight ?? 0.3;

    return {
      component: this.name,
      rawScore,
      weight: configWeight,
      weightedScore: rawScore * configWeight,
      metadata: { competencyCount: assignments.length, ratedCount: count },
    };
  }
}
