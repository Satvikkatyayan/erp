import { CommunicationMapper } from '../api/mappers/communication.mapper';
import { DispatchCommunicationRequestDto } from '../api/dtos/requests.dto';
import { DispatchCommunicationHandler } from '../commands/handlers/dispatch-communication.handler';
export declare class CommunicationLifecycleController {
    private readonly mapper;
    private readonly dispatchHandler;
    constructor(mapper: CommunicationMapper, dispatchHandler: DispatchCommunicationHandler);
    dispatchCommunication(tenantId: string, dto: DispatchCommunicationRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("../domain/delivery-result").DeliveryResult;
    }>;
}
//# sourceMappingURL=communication-lifecycle.controller.d.ts.map