import { PrismaService } from '../../../common/prisma/prisma.service';
import { CommunicationHistoryRepository } from '../repositories/communication-history.repository';
import { CommunicationTimelineRepository } from '../repositories/communication-timeline.repository';
import { CommunicationProvider } from '../interfaces/communication-provider.interface';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
export declare class CommunicationExecutionService {
    private readonly prisma;
    private readonly historyRepo;
    private readonly timelineRepo;
    private readonly provider;
    constructor(prisma: PrismaService, historyRepo: CommunicationHistoryRepository, timelineRepo: CommunicationTimelineRepository, provider: CommunicationProvider);
    dispatchCommunication(command: DispatchCommunicationCommand): Promise<any>;
}
//# sourceMappingURL=communication-execution.service.d.ts.map