import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
import { DeliveryResult } from '../domain/delivery-result';
export interface DeliveryServiceInterface {
    executeDelivery(command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=delivery-service.interface.d.ts.map