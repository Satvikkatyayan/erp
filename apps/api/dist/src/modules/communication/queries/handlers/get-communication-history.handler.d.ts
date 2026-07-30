import { GetCommunicationHistoryQuery } from '../get-communication-history.query';
import { CommunicationQueryService } from '../../services/communication-query.service';
export declare class GetCommunicationHistoryHandler {
    private readonly queryService;
    constructor(queryService: CommunicationQueryService);
    execute(query: GetCommunicationHistoryQuery): Promise<any>;
}
//# sourceMappingURL=get-communication-history.handler.d.ts.map