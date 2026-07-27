import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * KPI Scoring Plugin
 * 
 * Aggregates KPI achievement percentages from KPIResults in the snapshot.
 * KPIs are separate from goals — they represent measurable business metrics
 * that feed into scoring.
 */
@Injectable()
export class KpiScoringPlugin implements ScoringPlugin {
  readonly name = 'KPIScore';
  readonly order = 30;

  isApplicable(_ctx: ScoringContext): boolean {
    return true; // KPIs always evaluated if present
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const kpiResults = ctx.snapshotData?.kpiResults || [];

    if (kpiResults.length === 0) {
      return { component: this.name, rawScore: 0, weight: 0, weightedScore: 0, metadata: { reason: 'No KPI results' } };
    }

    // Average achievement percentage across all KPIs
    const totalAchievement = kpiResults.reduce((sum: number, r: any) => sum + (r.achievementPct || 0), 0);
    const rawScore = totalAchievement / kpiResults.length;
    const configWeight = ctx.cycleConfig?.kpiWeight ?? 0.2;

    return {
      component: this.name,
      rawScore: Math.min(rawScore, 100),
      weight: configWeight,
      weightedScore: Math.min(rawScore, 100) * configWeight,
      metadata: { kpiCount: kpiResults.length, avgAchievement: rawScore },
    };
  }
}
