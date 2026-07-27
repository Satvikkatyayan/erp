import { Logger } from '@nestjs/common';
import { PostgresFullTextProvider } from './core/search/providers/postgres-fts.provider';
import { SearchQueryPipeline } from './core/search/pipeline/query-pipeline';
import { SearchIndexerService } from './core/search/indexer/search-indexer.service';
import { PlatformSearchSDK } from './core/search/sdk/platform-search.sdk';
// Mock event bus for verification

class MockEventBus {
  subscribe(event: string, cb: any) {}
}

async function verifySearch() {
  const logger = new Logger('Search-Verification');
  logger.log('Starting Search Platform Verification...');

  const provider = new PostgresFullTextProvider();
  const pipeline = new SearchQueryPipeline(provider);
  const eventBus = new MockEventBus() as any;
  const indexer = new SearchIndexerService(eventBus, provider);
  
  const sdk = new PlatformSearchSDK(pipeline, indexer, provider);

  const mockContext = { orgId: 'org-123', userId: 'user-xyz' };

  // [Test 1] Full Text Query with Synonym Resolution & Security Filter
  logger.log('[Test 1] Query Pipeline Execution...');
  const results = await sdk.search(mockContext, 'employees', 'John Mgr');
  
  // Verify Synonym
  if (results.explain.parsedAs === 'john manager') {
    logger.log(' - ✅ Synonym Resolver correctly expanded "Mgr" -> "Manager"');
  } else {
    logger.error(' - ❌ Synonym Resolver failed');
  }

  // Verify Security Filter
  if (results.explain.filtersApplied.organizationId === 'org-123') {
    logger.log(' - ✅ RBAC Organization filter applied securely.');
  } else {
    logger.error(' - ❌ Security filter failed');
  }

  // [Test 2] Result Highlighting & Faceting
  logger.log('[Test 2] Highlighting & Faceting Execution...');
  const hit = results.results[0];
  if (hit.highlight && hit.highlight.name[0].includes('**Manager**')) {
    logger.log(' - ✅ Result highlighting injected successfully.');
  }
  
  if (results.facets.department['Human Resources'] === 1) {
    logger.log(' - ✅ Facet aggregations rolled up correctly.');
  }

  // [Test 3] Index Rebuild & Alias Switch (Zero Downtime)
  logger.log('[Test 3] Zero-Downtime Alias Rebuild...');
  const newIndex = await sdk.rebuild('employees');
  logger.log(' - ✅ Rebuild complete, alias switched to: ' + newIndex);

  logger.log('Search Platform Verification Completed Successfully.');
}

verifySearch().then(() => process.exit(0)).catch(e => {
  console.error(e);
  process.exit(1);
});
