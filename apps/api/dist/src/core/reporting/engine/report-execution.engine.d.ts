import { DatasetRegistry } from '../datasets/dataset-registry';
export declare class ReportExecutionEngine {
    private registry;
    private readonly logger;
    constructor(registry: DatasetRegistry);
    execute(reportConfig: any, context: any): Promise<{
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
}
//# sourceMappingURL=report-execution.engine.d.ts.map