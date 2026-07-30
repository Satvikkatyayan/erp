import { EventBus } from '@nestjs/cqrs';
import { DeliveryServiceInterface } from '../../contracts/delivery-service.interface';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
export declare class ScheduleReleaseCoordinator {
    private readonly deliveryService;
    private readonly eventBus;
    constructor(deliveryService: DeliveryServiceInterface, eventBus: EventBus);
    release(scheduleId: string, correlationId: string, command: DispatchCommunicationCommand): Promise<void>;
}
//# sourceMappingURL=schedule-release.coordinator.d.ts.map