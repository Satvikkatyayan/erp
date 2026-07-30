import { DeliveryServiceInterface } from '../contracts/delivery-service.interface';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
import { DeliveryResult } from '../domain/delivery-result';
import { TemplateRenderingService } from './template-rendering.service';
import { RoutingOrchestrator } from '../routing/orchestrator/routing.orchestrator';
import { EventBus } from '@nestjs/cqrs';
export declare class DeliveryService implements DeliveryServiceInterface {
    private readonly templateRenderingService;
    private readonly routingOrchestrator;
    private readonly eventBus;
    constructor(templateRenderingService: TemplateRenderingService, routingOrchestrator: RoutingOrchestrator, eventBus: EventBus);
    executeDelivery(command: DispatchCommunicationCommand): Promise<DeliveryResult>;
}
//# sourceMappingURL=delivery.service.d.ts.map