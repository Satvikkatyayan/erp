import { Injectable } from '@nestjs/common';
import { DispatchCommunicationHandler } from '../commands/handlers/dispatch-communication.handler';
import { GetCommunicationHistoryHandler } from '../queries/handlers/get-communication-history.handler';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
import { GetCommunicationHistoryQuery } from '../queries/get-communication-history.query';
import { DispatchCommunicationRequestDto } from '../api/dtos/requests.dto';
import { CommunicationHistoryDto } from '../api/dtos/responses.dto';
import { CommunicationMapper } from '../api/mappers/communication.mapper';
import { Channel } from '../domain/channel.enum';

@Injectable()
export class PlatformCommunicationSDK {
  constructor(
    private readonly dispatchHandler: DispatchCommunicationHandler,
    private readonly historyHandler: GetCommunicationHistoryHandler,
    private readonly mapper: CommunicationMapper
  ) {}

  async dispatch(tenantId: string, payload: DispatchCommunicationRequestDto): Promise<any> {
    // M1 backwards compatibility adaptation for M5
    const command = new DispatchCommunicationCommand(
      tenantId,
      payload.recipient || 'unknown-recipient',
      (payload.channel as Channel) || Channel.EMAIL,
      'legacy-template',
      payload.metadata || {}
    );
    const result = await this.dispatchHandler.execute(command);
    return result;
  }

  async getHistory(tenantId: string, filters?: any): Promise<CommunicationHistoryDto[]> {
    const query = new GetCommunicationHistoryQuery(tenantId, filters);
    const records = await this.historyHandler.execute(query);
    return this.mapper.mapToHistoryDtoList(records);
  }
}
