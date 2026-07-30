import { CommunicationHistoryRepository } from '../repositories/communication-history.repository';
import { GetCommunicationHistoryQuery } from '../queries/get-communication-history.query';
export declare class CommunicationQueryService {
    private readonly historyRepo;
    constructor(historyRepo: CommunicationHistoryRepository);
    getHistory(query: GetCommunicationHistoryQuery): Promise<any>;
}
//# sourceMappingURL=communication-query.service.d.ts.map