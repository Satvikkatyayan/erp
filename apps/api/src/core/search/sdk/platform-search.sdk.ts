import { Injectable } from '@nestjs/common';
import { SearchQueryPipeline } from '../pipeline/query-pipeline';
import { SearchIndexerService } from '../indexer/search-indexer.service';
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';

@Injectable()
export class PlatformSearchSDK {
  constructor(
    private pipeline: SearchQueryPipeline,
    private indexer: SearchIndexerService,
    private provider: PostgresFullTextProvider
  ) {}

  async search(context: any, indexAlias: string, query: string) {
    return this.pipeline.executeQuery(context, query, indexAlias);
  }
  
  async indexNow(indexAlias: string, docId: string, payload: any) {
    return this.provider.indexDocument(indexAlias, docId, payload);
  }
  
  async rebuild(indexAlias: string) {
    return this.indexer.rebuildIndexZeroDowntime(indexAlias);
  }
}