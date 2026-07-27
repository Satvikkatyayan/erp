"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchModule = void 0;
const common_1 = require("@nestjs/common");
const postgres_fts_provider_1 = require("./providers/postgres-fts.provider");
const query_pipeline_1 = require("./pipeline/query-pipeline");
const search_indexer_service_1 = require("./indexer/search-indexer.service");
const platform_search_sdk_1 = require("./sdk/platform-search.sdk");
let SearchModule = class SearchModule {
};
exports.SearchModule = SearchModule;
exports.SearchModule = SearchModule = __decorate([
    (0, common_1.Module)({
        providers: [
            postgres_fts_provider_1.PostgresFullTextProvider,
            query_pipeline_1.SearchQueryPipeline,
            search_indexer_service_1.SearchIndexerService,
            platform_search_sdk_1.PlatformSearchSDK
        ],
        exports: [platform_search_sdk_1.PlatformSearchSDK]
    })
], SearchModule);
//# sourceMappingURL=search.module.js.map