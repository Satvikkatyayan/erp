import { Module } from '@nestjs/common';
import { PostgresFullTextProvider } from './providers/postgres-fts.provider';
import { SearchQueryPipeline } from './pipeline/query-pipeline';
import { SearchIndexerService } from './indexer/search-indexer.service';
import { PlatformSearchSDK } from './sdk/platform-search.sdk';

@Module({
  providers: [
    PostgresFullTextProvider,
    SearchQueryPipeline,
    SearchIndexerService,
    PlatformSearchSDK
  ],
  exports: [PlatformSearchSDK]
})
export class SearchModule {}
