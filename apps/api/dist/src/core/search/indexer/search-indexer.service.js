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
var SearchIndexerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchIndexerService = void 0;
const common_1 = require("@nestjs/common");
const postgres_fts_provider_1 = require("../providers/postgres-fts.provider");
const event_bus_service_1 = require("../../events/event-bus.service");
let SearchIndexerService = SearchIndexerService_1 = class SearchIndexerService {
    constructor(eventBus, provider) {
        this.eventBus = eventBus;
        this.provider = provider;
        this.logger = new common_1.Logger(SearchIndexerService_1.name);
    }
    onModuleInit() {
        this.eventBus.subscribe('EntityChanged', async (event) => {
            this.logger.debug(`[SearchIndexer] Received EntityChanged event for ${event.entityType}`);
            await this.provider.indexDocument(event.entityType, event.entityId, event.payload);
        });
    }
    async rebuildIndexZeroDowntime(alias) {
        const newIndexName = `${alias}_v${Date.now()}`;
        await this.provider.createIndex(newIndexName, {});
        this.logger.debug(`[SearchIndexer] Bulk indexing into ${newIndexName}...`);
        await this.provider.switchAlias(alias, newIndexName);
        this.logger.log(`[SearchIndexer] Rebuild complete. ${alias} -> ${newIndexName}`);
        return newIndexName;
    }
};
exports.SearchIndexerService = SearchIndexerService;
exports.SearchIndexerService = SearchIndexerService = SearchIndexerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [event_bus_service_1.EventBusService,
        postgres_fts_provider_1.PostgresFullTextProvider])
], SearchIndexerService);
//# sourceMappingURL=search-indexer.service.js.map