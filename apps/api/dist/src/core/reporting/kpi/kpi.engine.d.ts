import { ReportExecutionEngine } from '../engine/report-execution.engine';
export declare class KPIEngine {
    private engine;
    private readonly logger;
    constructor(engine: ReportExecutionEngine);
    evaluateKPI(kpiDef: any, context: any): Promise<{
        value: number;
        exceeded: boolean;
        explainability: {
            cacheHit: boolean;
            durationMs: number;
            datasetVersion: string;
            filtersApplied: any;
            securityTrimOrg: any;
            freshnessTimestamp: string;
        };
    }>;
}
//# sourceMappingURL=kpi.engine.d.ts.map