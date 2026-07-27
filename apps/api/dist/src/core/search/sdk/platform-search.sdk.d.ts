import { SearchQueryPipeline } from '../pipeline/query-pipeline';
import { SearchIndexerService } from '../indexer/search-indexer.service';
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';
export declare class PlatformSearchSDK {
    private pipeline;
    private indexer;
    private provider;
    constructor(pipeline: SearchQueryPipeline, indexer: SearchIndexerService, provider: PostgresFullTextProvider);
    search(context: any, indexAlias: string, query: string): Promise<{
        results: any;
        facets: any;
        explain: {
            parsedAs: string;
            filtersApplied: {
                organizationId: any;
            };
        };
    }>;
    indexNow(indexAlias: string, docId: string, payload: any): Promise<boolean>;
    rebuild(indexAlias: string): Promise<string>;
}
//# sourceMappingURL=platform-search.sdk.d.ts.map