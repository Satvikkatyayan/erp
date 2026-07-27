import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';
import { EventBusService } from '../../events/event-bus.service';

@Injectable()
export class SearchIndexerService implements OnModuleInit {
  private readonly logger = new Logger(SearchIndexerService.name);

  constructor(
    private eventBus: EventBusService,
    private provider: PostgresFullTextProvider
  ) {}

  onModuleInit() {
    this.eventBus.subscribe('EntityChanged', async (event) => {
      this.logger.debug(`[SearchIndexer] Received EntityChanged event for ${event.entityType}`);
      await this.provider.indexDocument(event.entityType, event.entityId, event.payload);
    });
  }
  
  async rebuildIndexZeroDowntime(alias: string) {
    const newIndexName = `${alias}_v${Date.now()}`;
    await this.provider.createIndex(newIndexName, {});
    
    this.logger.debug(`[SearchIndexer] Bulk indexing into ${newIndexName}...`);
    // Wait for bulk index
    
    await this.provider.switchAlias(alias, newIndexName);
    this.logger.log(`[SearchIndexer] Rebuild complete. ${alias} -> ${newIndexName}`);
    return newIndexName;
  }
}