import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class GoalScoringPlugin implements ScoringPlugin {
    readonly name = "GoalScore";
    readonly order = 10;
    isApplicable(_ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=goal-scoring.plugin.d.ts.map