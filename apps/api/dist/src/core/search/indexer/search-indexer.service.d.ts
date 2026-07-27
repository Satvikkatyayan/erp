import { OnModuleInit } from '@nestjs/common';
import { PostgresFullTextProvider } from '../providers/postgres-fts.provider';
import { EventBusService } from '../../events/event-bus.service';
export declare class SearchIndexerService implements OnModuleInit {
    private eventBus;
    private provider;
    private readonly logger;
    constructor(eventBus: EventBusService, provider: PostgresFullTextProvider);
    onModuleInit(): void;
    rebuildIndexZeroDowntime(alias: string): Promise<string>;
}
//# sourceMappingURL=search-indexer.service.d.ts.map