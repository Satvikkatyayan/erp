import { ReportExecutionEngine } from '../engine/report-execution.engine';
import { KPIEngine } from '../kpi/kpi.engine';
export declare class PlatformReportingSDK {
    private engine;
    private kpi;
    private readonly logger;
    constructor(engine: ReportExecutionEngine, kpi: KPIEngine);
    runReport(reportConfig: any, context: any): Promise<{
        data: any[];
        explainability: {
            cacheHit: boolean;
            durationMs: number;
            datasetVersion: string;
            filtersApplied: any;
            securityTrimOrg: any;
            freshnessTimestamp: string;
        };
        drillDownMetadata: {
            entity: any;
            navContext: string;
        };
    }>;
    runCachedReport(snapshotHash: string): Promise<{
        data: {
            cached: boolean;
        }[];
        explainability: {
            cacheHit: boolean;
            durationMs: number;
        };
    }>;
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
    scheduleExportPipeline(reportConfig: any, context: any): Promise<boolean>;
}
//# sourceMappingURL=platform-reporting.sdk.d.ts.map