import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { CommunicationHistoryRepository } from '../repositories/communication-history.repository';
import { CommunicationTimelineRepository } from '../repositories/communication-timeline.repository';
import { COMMUNICATION_PROVIDER_TOKEN } from '../config/communication.constants';
import { CommunicationProvider } from '../interfaces/communication-provider.interface';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';

@Injectable()
export class CommunicationExecutionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly historyRepo: CommunicationHistoryRepository,
    private readonly timelineRepo: CommunicationTimelineRepository,
    @Inject(COMMUNICATION_PROVIDER_TOKEN)
    private readonly provider: CommunicationProvider
  ) {}

  async dispatchCommunication(command: DispatchCommunicationCommand): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // Create initial history record (Pending status)
      const history = await this.historyRepo.createHistory(
        command.tenantId,
        {
          ...command.payload,
          status: 'PENDING',
        },
        tx
      );

      // Create timeline entry for dispatch request
      const timeline = await this.timelineRepo.createTimelineEntry(
        command.tenantId,
        history.id,
        'DISPATCH_REQUESTED',
        { payload: command.payload },
        tx
      );

      // Delegate work to the approved asynchronous communication boundary.
      // (For Milestone 1, we simulate passing to the boundary interface).
      await this.provider.send({
        historyId: history.id,
        ...command.payload,
      });

      return { history, timeline };
    });
  }
}
