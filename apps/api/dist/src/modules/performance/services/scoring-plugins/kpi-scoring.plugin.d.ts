import { ScoringPlugin, ScoringContext, ScoringResult } from './scoring-plugin.interface';
export declare class KpiScoringPlugin implements ScoringPlugin {
    readonly name = "KPIScore";
    readonly order = 30;
    isApplicable(_ctx: ScoringContext): boolean;
    evaluate(ctx: ScoringContext): Promise<ScoringResult>;
}
//# sourceMappingURL=kpi-scoring.plugin.d.ts.map