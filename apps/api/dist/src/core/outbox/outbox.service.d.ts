import { PrismaService } from '../../common/prisma/prisma.service';
import { DomainEvent } from '../events/interfaces/domain-event.interface';
import { RequestContextService } from '../context/request-context.service';
export declare class OutboxService {
    private readonly prisma;
    private readonly context;
    constructor(prisma: PrismaService, context: RequestContextService);
    saveEvent(event: DomainEvent, tx?: any): Promise<void>;
}
//# sourceMappingURL=outbox.service.d.ts.map