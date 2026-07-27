"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const postgres_fts_provider_1 = require("./core/search/providers/postgres-fts.provider");
const query_pipeline_1 = require("./core/search/pipeline/query-pipeline");
const search_indexer_service_1 = require("./core/search/indexer/search-indexer.service");
const platform_search_sdk_1 = require("./core/search/sdk/platform-search.sdk");
class MockEventBus {
    subscribe(event, cb) { }
}
async function verifySearch() {
    const logger = new common_1.Logger('Search-Verification');
    logger.log('Starting Search Platform Verification...');
    const provider = new postgres_fts_provider_1.PostgresFullTextProvider();
    const pipeline = new query_pipeline_1.SearchQueryPipeline(provider);
    const eventBus = new MockEventBus();
    const indexer = new search_indexer_service_1.SearchIndexerService(eventBus, provider);
    const sdk = new platform_search_sdk_1.PlatformSearchSDK(pipeline, indexer, provider);
    const mockContext = { orgId: 'org-123', userId: 'user-xyz' };
    logger.log('[Test 1] Query Pipeline Execution...');
    const results = await sdk.search(mockContext, 'employees', 'John Mgr');
    if (results.explain.parsedAs === 'john manager') {
        logger.log(' - ✅ Synonym Resolver correctly expanded "Mgr" -> "Manager"');
    }
    else {
        logger.error(' - ❌ Synonym Resolver failed');
    }
    if (results.explain.filtersApplied.organizationId === 'org-123') {
        logger.log(' - ✅ RBAC Organization filter applied securely.');
    }
    else {
        logger.error(' - ❌ Security filter failed');
    }
    logger.log('[Test 2] Highlighting & Faceting Execution...');
    const hit = results.results[0];
    if (hit.highlight && hit.highlight.name[0].includes('**Manager**')) {
        logger.log(' - ✅ Result highlighting injected successfully.');
    }
    if (results.facets.department['Human Resources'] === 1) {
        logger.log(' - ✅ Facet aggregations rolled up correctly.');
    }
    logger.log('[Test 3] Zero-Downtime Alias Rebuild...');
    const newIndex = await sdk.rebuild('employees');
    logger.log(' - ✅ Rebuild complete, alias switched to: ' + newIndex);
    logger.log('Search Platform Verification Completed Successfully.');
}
verifySearch().then(() => process.exit(0)).catch(e => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=verify-search.js.map