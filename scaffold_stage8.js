const fs = require('fs');
const path = require('path');

const SEARCH_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\search';

const directories = [
    path.join(SEARCH_DIR, 'providers'),
    path.join(SEARCH_DIR, 'pipeline'),
    path.join(SEARCH_DIR, 'indexer'),
    path.join(SEARCH_DIR, 'sdk'),
];

directories.forEach(dir => {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
});

const files = {
    // ----------------------------------------------------
    // PROVIDER ABSTRACTION
    // ----------------------------------------------------
    [path.join(SEARCH_DIR, 'providers', 'search-provider.interface.ts')]: `
export interface ISearchProvider {
  indexDocument(indexAlias: string, documentId: string, payload: any): Promise<boolean>;
  deleteDocument(indexAlias: string, documentId: string): Promise<boolean>;
  search(indexAlias: string, query: any): Promise<any>;
  createIndex(indexName: string, mappings: any): Promise<boolean>;
  switchAlias(alias: string, targetIndex: string): Promise<boolean>;
}
`,
    [path.join(SEARCH_DIR, 'providers', 'postgres-fts.provider.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { ISearchProvider } from './search-provider.interface';

@Injectable()
export class PostgresFullTextProvider implements ISearchProvider {
  private readonly logger = new Logger(PostgresFullTextProvider.name);

  async indexDocument(indexAlias: string, documentId: string, payload: any): Promise<boolean> {
    this.logger.debug(\`[PostgresFTS] Indexing \${documentId} into \${indexAlias}\`);
    // In reality this would upsert SearchDocument and cast tsvector.
    return true;
  }
  
  async deleteDocument(indexAlias: string, documentId: string): Promise<boolean> {
    return true;
  }

  async search(indexAlias: string, query: any): Promise<any> {
    this.logger.debug(\`[PostgresFTS] Querying \${indexAlias} with FTS \${query.text}\`);
    // Mock FTS match
    return {
      hits: [
        {
          id: 'doc1',
          score: 0.95,
          highlight: { name: ['John **Manager** Smith'] },
          source: { department: 'Human Resources', name: 'John Manager Smith' }
        }
      ],
      aggregations: {
        department: { 'Human Resources': 1 }
      }
    };
  }
  
  async createIndex(indexName: string, mappings: any): Promise<boolean> {
    this.logger.debug(\`[PostgresFTS] Created physical index \${indexName}\`);
    return true;
  }
  
  async switchAlias(alias: string, targetIndex: string): Promise<boolean> {
    this.logger.debug(\`[PostgresFTS] Switched alias \${alias} -> \${targetIndex}\`);
    return true;
  }
}
`,
    // ----------------------------------------------------
    // QUERY PIPELINE
    // ----------------------------------------------------
    [path.join(SEARCH_DIR, 'pipeline', 'query-pipeline.ts')]: `
import { Injectable, Logger } from '@nestjs/common';
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';

@Injectable()
export class SearchQueryPipeline {
  private readonly logger = new Logger(SearchQueryPipeline.name);
  
  constructor(private provider: PostgresFullTextProvider) {}

  async executeQuery(context: any, rawQuery: string, indexAlias: string) {
    // 1. Parse
    const parsed = { text: rawQuery };
    
    // 2. Normalize
    const normalized = { text: parsed.text.toLowerCase().trim() };
    
    // 3. Synonym Resolution
    if (normalized.text.includes('mgr')) {
        normalized.text = normalized.text.replace('mgr', 'manager');
    }
    
    // 4. Permission Filter (Security Trim)
    const securityQuery = {
      ...normalized,
      must: { organizationId: context.orgId }
    };
    
    this.logger.debug(\`Executing Query Pipeline for Org: \${context.orgId}\`);
    
    // 5. Provider Execution
    const rawResults = await this.provider.search(indexAlias, securityQuery);
    
    // 6. Ranker
    // Apply ranking profile logic to rawResults.hits
    
    // 7. Formatter
    return {
      results: rawResults.hits,
      facets: rawResults.aggregations,
      explain: {
        parsedAs: normalized.text,
        filtersApplied: securityQuery.must
      }
    };
  }
}
`,
    // ----------------------------------------------------
    // INDEXER (Background Worker)
    // ----------------------------------------------------
    [path.join(SEARCH_DIR, 'indexer', 'search-indexer.service.ts')]: `
import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PlatformEventBus } from '../../../core/events/event-bus'; // Assume injected
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';

@Injectable()
export class SearchIndexerService implements OnModuleInit {
  private readonly logger = new Logger(SearchIndexerService.name);

  constructor(
    private eventBus: PlatformEventBus,
    private provider: PostgresFullTextProvider
  ) {}

  onModuleInit() {
    this.eventBus.subscribe('EntityChanged', async (event) => {
      this.logger.debug(\`[SearchIndexer] Received EntityChanged event for \${event.entityType}\`);
      await this.provider.indexDocument(event.entityType, event.entityId, event.payload);
    });
  }
  
  async rebuildIndexZeroDowntime(alias: string) {
    const newIndexName = \`\${alias}_v\${Date.now()}\`;
    await this.provider.createIndex(newIndexName, {});
    
    this.logger.debug(\`[SearchIndexer] Bulk indexing into \${newIndexName}...\`);
    // Wait for bulk index
    
    await this.provider.switchAlias(alias, newIndexName);
    this.logger.log(\`[SearchIndexer] Rebuild complete. \${alias} -> \${newIndexName}\`);
    return newIndexName;
  }
}
`,
    // ----------------------------------------------------
    // PLATFORM SDK
    // ----------------------------------------------------
    [path.join(SEARCH_DIR, 'sdk', 'platform-search.sdk.ts')]: `
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
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 8 Search Platform files scaffolded.');
