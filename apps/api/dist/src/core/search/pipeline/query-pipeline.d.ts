import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';
export declare class SearchQueryPipeline {
    private provider;
    private readonly logger;
    constructor(provider: PostgresFullTextProvider);
    executeQuery(context: any, rawQuery: string, indexAlias: string): Promise<{
        results: any;
        facets: any;
        explain: {
            parsedAs: string;
            filtersApplied: {
                organizationId: any;
            };
        };
    }>;
}
//# sourceMappingURL=query-pipeline.d.ts.map