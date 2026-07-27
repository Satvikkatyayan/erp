import { PrismaService } from '../../common/prisma/prisma.service';
import { EventBusService } from '../events/event-bus.service';
export declare class OutboxRelayWorker {
    private readonly prisma;
    private readonly eventBus;
    private readonly logger;
    private isProcessing;
    constructor(prisma: PrismaService, eventBus: EventBusService);
    handleRelay(): Promise<void>;
}
//# sourceMappingURL=outbox-relay.worker.d.ts.map