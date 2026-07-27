import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class NormalizationPlugin implements ScoringPlugin {
    readonly name = "Normalization";
    readonly order = 90;
    isApplicable(_ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
    private applyBellCurve;
    private applyMinMax;
}
//# sourceMappingURL=normalization.plugin.d.ts.map