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
    
    this.logger.debug(`Executing Query Pipeline for Org: ${context.orgId}`);
    
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