import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class BonusScoringPlugin implements ScoringPlugin {
    readonly name = "BonusRecommendation";
    readonly order = 100;
    isApplicable(ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
    private calculateBonusTier;
    private getTierLabel;
}
//# sourceMappingURL=bonus-scoring.plugin.d.ts.map