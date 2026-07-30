import { CommunicationMapper } from '../api/mappers/communication.mapper';
import { GetCommunicationHistoryQueryDto } from '../api/dtos/requests.dto';
import { GetCommunicationHistoryHandler } from '../queries/handlers/get-communication-history.handler';
export declare class CommunicationQueryController {
    private readonly mapper;
    private readonly historyHandler;
    constructor(mapper: CommunicationMapper, historyHandler: GetCommunicationHistoryHandler);
    getHistory(tenantId: string, dto: GetCommunicationHistoryQueryDto): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/responses.dto").CommunicationHistoryDto[];
    }>;
}
//# sourceMappingURL=communication-query.controller.d.ts.map