import { CommandBus } from '@nestjs/cqrs';
import { DispatchCommunicationDto } from '../dtos/dispatch-communication.dto';
import { DeliveryResult } from '../../domain/delivery-result';
export declare class DeliveryController {
    private readonly commandBus;
    constructor(commandBus: CommandBus);
    dispatch(dto: DispatchCommunicationDto): Promise<DeliveryResult>;
}
//# sourceMappingURL=delivery.controller.d.ts.map