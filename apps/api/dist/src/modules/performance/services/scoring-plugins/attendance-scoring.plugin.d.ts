import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class AttendanceScoringPlugin implements ScoringPlugin {
    readonly name = "AttendanceScore";
    readonly order = 40;
    isApplicable(ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=attendance-scoring.plugin.d.ts.map