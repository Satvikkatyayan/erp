"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var PostgresFullTextProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresFullTextProvider = void 0;
const common_1 = require("@nestjs/common");
let PostgresFullTextProvider = PostgresFullTextProvider_1 = class PostgresFullTextProvider {
    constructor() {
        this.logger = new common_1.Logger(PostgresFullTextProvider_1.name);
    }
    async indexDocument(indexAlias, documentId, payload) {
        this.logger.debug(`[PostgresFTS] Indexing ${documentId} into ${indexAlias}`);
        return true;
    }
    async deleteDocument(indexAlias, documentId) {
        return true;
    }
    async search(indexAlias, query) {
        this.logger.debug(`[PostgresFTS] Querying ${indexAlias} with FTS ${query.text}`);
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
    async createIndex(indexName, mappings) {
        this.logger.debug(`[PostgresFTS] Created physical index ${indexName}`);
        return true;
    }
    async switchAlias(alias, targetIndex) {
        this.logger.debug(`[PostgresFTS] Switched alias ${alias} -> ${targetIndex}`);
        return true;
    }
};
exports.PostgresFullTextProvider = PostgresFullTextProvider;
exports.PostgresFullTextProvider = PostgresFullTextProvider = PostgresFullTextProvider_1 = __decorate([
    (0, common_1.Injectable)()
], PostgresFullTextProvider);
//# sourceMappingURL=postgres-fts.provider.js.map