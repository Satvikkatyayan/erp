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
var SearchQueryPipeline_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchQueryPipeline = void 0;
const common_1 = require("@nestjs/common");
const postgres_fts_provider_1 = require("../providers/postgres-fts.provider");
let SearchQueryPipeline = SearchQueryPipeline_1 = class SearchQueryPipeline {
    constructor(provider) {
        this.provider = provider;
        this.logger = new common_1.Logger(SearchQueryPipeline_1.name);
    }
    async executeQuery(context, rawQuery, indexAlias) {
        const parsed = { text: rawQuery };
        const normalized = { text: parsed.text.toLowerCase().trim() };
        if (normalized.text.includes('mgr')) {
            normalized.text = normalized.text.replace('mgr', 'manager');
        }
        const securityQuery = {
            ...normalized,
            must: { organizationId: context.orgId }
        };
        this.logger.debug(`Executing Query Pipeline for Org: ${context.orgId}`);
        const rawResults = await this.provider.search(indexAlias, securityQuery);
        return {
            results: rawResults.hits,
            facets: rawResults.aggregations,
            explain: {
                parsedAs: normalized.text,
                filtersApplied: securityQuery.must
            }
        };
    }
};
exports.SearchQueryPipeline = SearchQueryPipeline;
exports.SearchQueryPipeline = SearchQueryPipeline = SearchQueryPipeline_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [postgres_fts_provider_1.PostgresFullTextProvider])
], SearchQueryPipeline);
//# sourceMappingURL=query-pipeline.js.map