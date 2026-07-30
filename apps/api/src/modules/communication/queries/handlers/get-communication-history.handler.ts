import { Injectable } from '@nestjs/common';
import { GetCommunicationHistoryQuery } from '../get-communication-history.query';
import { CommunicationQueryService } from '../../services/communication-query.service';

@Injectable()
export class GetCommunicationHistoryHandler {
  constructor(private readonly queryService: CommunicationQueryService) {}

  async execute(query: GetCommunicationHistoryQuery): Promise<any> {
    return this.queryService.getHistory(query);
  }
}
