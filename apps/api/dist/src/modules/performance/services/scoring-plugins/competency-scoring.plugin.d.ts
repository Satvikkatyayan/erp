import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class CompetencyScoringPlugin implements ScoringPlugin {
    readonly name = "CompetencyScore";
    readonly order = 20;
    isApplicable(_ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=competency-scoring.plugin.d.ts.map