import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Bonus Scoring Plugin
 * 
 * Post-processing plugin that calculates bonus recommendation percentage
 * based on the final normalized score and organization-specific rules.
 * 
 * This does not directly create bonus records — it provides a recommendation
 * value that the PerformanceCycleService uses to create PerfBonusRecommendation.
 */
@Injectable()
export class BonusScoringPlugin implements ScoringPlugin {
  readonly name = 'BonusRecommendation';
  readonly order = 100;

  isApplicable(ctx: ScoringContext): boolean {
    return ctx.cycleConfig?.enableBonusRecommendation === true;
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const normalizedScore = ctx.snapshotData?._normalizedScore ?? 0;

    // Bonus tiers based on performance score
    // These would typically come from PlatformRulesSDK in production
    const bonusPct = this.calculateBonusTier(normalizedScore);

    return {
      component: this.name,
      rawScore: normalizedScore,
      weight: 0, // Bonus doesn't affect performance score
      weightedScore: 0,
      metadata: {
        recommendedBonusPct: bonusPct,
        basedOnScore: normalizedScore,
        tier: this.getTierLabel(normalizedScore),
      },
    };
  }

  private calculateBonusTier(score: number): number {
    if (score >= 90) return 20; // Exceptional: 20%
    if (score >= 80) return 15; // Exceeds Expectations: 15%
    if (score >= 70) return 10; // Meets Expectations: 10%
    if (score >= 60) return 5;  // Needs Improvement: 5%
    return 0;                    // Below Expectations: 0%
  }

  private getTierLabel(score: number): string {
    if (score >= 90) return 'Exceptional';
    if (score >= 80) return 'Exceeds Expectations';
    if (score >= 70) return 'Meets Expectations';
    if (score >= 60) return 'Needs Improvement';
    return 'Below Expectations';
  }
}
