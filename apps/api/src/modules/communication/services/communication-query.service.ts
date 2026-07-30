import { Injectable } from '@nestjs/common';
import { CommunicationHistoryRepository } from '../repositories/communication-history.repository';
import { GetCommunicationHistoryQuery } from '../queries/get-communication-history.query';

@Injectable()
export class CommunicationQueryService {
  constructor(private readonly historyRepo: CommunicationHistoryRepository) {}

  async getHistory(query: GetCommunicationHistoryQuery): Promise<any> {
    return this.historyRepo.getHistoryByTenant(query.tenantId, query.params);
  }
}
