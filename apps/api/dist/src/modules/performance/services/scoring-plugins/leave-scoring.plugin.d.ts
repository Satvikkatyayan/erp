import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class LeaveScoringPlugin implements ScoringPlugin {
    readonly name = "LeaveScore";
    readonly order = 50;
    isApplicable(ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=leave-scoring.plugin.d.ts.map