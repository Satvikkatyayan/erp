import { Injectable } from '@nestjs/common';
import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';

/**
 * Normalization Plugin
 * 
 * Post-processing plugin that normalizes the cumulative weighted score.
 * Applies curve-fitting using the scoring strategy configured for the cycle.
 * 
 * This plugin receives the raw weighted total from preceding plugins
 * (passed via snapshotData._cumulativeWeightedTotal) and normalizes it.
 * 
 * Normalization strategies:
 *  - Linear: Direct pass-through (0-100 scale)
 *  - BellCurve: Apply bell curve normalization
 *  - MinMax: Scale to min-max range
 */
@Injectable()
export class NormalizationPlugin implements ScoringPlugin {
  readonly name = 'Normalization';
  readonly order = 90;

  isApplicable(_ctx: ScoringContext): boolean {
    return true; // Always applicable
  }

  async evaluate(ctx: ScoringContext): Promise<ScoringResult> {
    const rawTotal = ctx.snapshotData?._cumulativeWeightedTotal ?? 0;
    const strategy = ctx.cycleConfig?.normalizationStrategy ?? 'Linear';

    let normalizedScore: number;

    switch (strategy) {
      case 'BellCurve':
        normalizedScore = this.applyBellCurve(rawTotal);
        break;
      case 'MinMax':
        normalizedScore = this.applyMinMax(rawTotal, ctx.cycleConfig?.minScore ?? 0, ctx.cycleConfig?.maxScore ?? 100);
        break;
      case 'Linear':
      default:
        normalizedScore = Math.min(Math.max(rawTotal, 0), 100);
        break;
    }

    return {
      component: this.name,
      rawScore: rawTotal,
      weight: 1, // Normalization weight is always 1 (pass-through)
      weightedScore: normalizedScore,
      metadata: { strategy, preNormalization: rawTotal, postNormalization: normalizedScore },
    };
  }

  private applyBellCurve(score: number): number {
    // Sigmoid-based bell curve normalization centered at 50
    const midpoint = 50;
    const steepness = 0.1;
    const sigmoid = 100 / (1 + Math.exp(-steepness * (score - midpoint)));
    return Math.round(sigmoid * 100) / 100;
  }

  private applyMinMax(score: number, min: number, max: number): number {
    if (max <= min) return score;
    return Math.min(Math.max(((score - min) / (max - min)) * 100, 0), 100);
  }
}
