import { PrismaService } from '../../../common/prisma/prisma.service';
import { AttendanceSnapshotService } from '../services/attendance-snapshot.service';
import { AttendanceInitializationService } from '../services/attendance-initialization.service';
import { EventBusService } from '../../../core/events/event-bus.service';
export declare class CreateDailySiteMusterCommand {
    readonly siteId: string;
    readonly projectId: string;
    readonly musterDate: Date;
    readonly siteClerkId: string;
    readonly tenantId: string;
    readonly organizationId: string;
    readonly correlationId: string;
    readonly shiftId?: string;
    constructor(siteId: string, projectId: string, musterDate: Date, siteClerkId: string, tenantId?: string, organizationId?: string, correlationId?: string, shiftId?: string);
}
export declare class CreateDailySiteMusterCommandHandler {
    private readonly prisma;
    private readonly snapshotService;
    private readonly initService;
    private readonly eventBus;
    constructor(prisma: PrismaService, snapshotService: AttendanceSnapshotService, initService: AttendanceInitializationService, eventBus: EventBusService);
    execute(command: CreateDailySiteMusterCommand): Promise<any>;
}
//# sourceMappingURL=create-daily-site-muster.command.d.ts.map