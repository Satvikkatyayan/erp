import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../events/event-bus.service';
export declare class RuleCommandService {
    private prisma;
    private eventBus;
    constructor(prisma: PrismaService, eventBus: EventBusService);
    publishVersion(ruleSetId: string, versionData: any): Promise<void>;
}
//# sourceMappingURL=rule-command.service.d.ts.map