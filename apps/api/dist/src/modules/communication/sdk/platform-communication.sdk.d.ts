import { DispatchCommunicationHandler } from '../commands/handlers/dispatch-communication.handler';
import { GetCommunicationHistoryHandler } from '../queries/handlers/get-communication-history.handler';
import { DispatchCommunicationRequestDto } from '../api/dtos/requests.dto';
import { CommunicationHistoryDto } from '../api/dtos/responses.dto';
import { CommunicationMapper } from '../api/mappers/communication.mapper';
export declare class PlatformCommunicationSDK {
    private readonly dispatchHandler;
    private readonly historyHandler;
    private readonly mapper;
    constructor(dispatchHandler: DispatchCommunicationHandler, historyHandler: GetCommunicationHistoryHandler, mapper: CommunicationMapper);
    dispatch(tenantId: string, payload: DispatchCommunicationRequestDto): Promise<any>;
    getHistory(tenantId: string, filters?: any): Promise<CommunicationHistoryDto[]>;
}
//# sourceMappingURL=platform-communication.sdk.d.ts.map