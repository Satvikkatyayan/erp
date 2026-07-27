import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
export declare class AttendanceHealthService {
    private readonly prisma;
    private readonly eventBus;
    private readonly logger;
    constructor(prisma: PrismaService, eventBus: EventBusService);
    updateMusterHealth(musterId: string, correlationId: string, prismaTx?: any): Promise<void>;
}
//# sourceMappingURL=attendance-health.service.d.ts.map