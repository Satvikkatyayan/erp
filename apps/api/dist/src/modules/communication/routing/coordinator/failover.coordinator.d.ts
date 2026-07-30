import { RoutingOrchestrator, RoutingResult } from '../orchestrator/routing.orchestrator';
import { DeliveryContext } from '../../domain/delivery-context';
export declare class FailoverCoordinator {
    private readonly routingOrchestrator;
    constructor(routingOrchestrator: RoutingOrchestrator);
    performFailover(context: DeliveryContext, previouslyFailedProviderNames: string[]): RoutingResult | null;
}
//# sourceMappingURL=failover.coordinator.d.ts.map