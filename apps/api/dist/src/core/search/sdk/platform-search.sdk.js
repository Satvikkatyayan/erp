"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlatformSearchSDK = void 0;
const common_1 = require("@nestjs/common");
const query_pipeline_1 = require("../pipeline/query-pipeline");
const search_indexer_service_1 = require("../indexer/search-indexer.service");
const postgres_fts_provider_1 = require("../providers/postgres-fts.provider");
let PlatformSearchSDK = class PlatformSearchSDK {
    constructor(pipeline, indexer, provider) {
        this.pipeline = pipeline;
        this.indexer = indexer;
        this.provider = provider;
    }
    async search(context, indexAlias, query) {
        return this.pipeline.executeQuery(context, query, indexAlias);
    }
    async indexNow(indexAlias, docId, payload) {
        return this.provider.indexDocument(indexAlias, docId, payload);
    }
    async rebuild(indexAlias) {
        return this.indexer.rebuildIndexZeroDowntime(indexAlias);
    }
};
exports.PlatformSearchSDK = PlatformSearchSDK;
exports.PlatformSearchSDK = PlatformSearchSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [query_pipeline_1.SearchQueryPipeline,
        search_indexer_service_1.SearchIndexerService,
        postgres_fts_provider_1.PostgresFullTextProvider])
], PlatformSearchSDK);
//# sourceMappingURL=platform-search.sdk.js.map