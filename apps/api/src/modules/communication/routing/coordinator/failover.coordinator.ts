import { Injectable } from '@nestjs/common';
import { RoutingOrchestrator, RoutingResult } from '../orchestrator/routing.orchestrator';
import { DeliveryContext } from '../../domain/delivery-context';

@Injectable()
export class FailoverCoordinator {
  constructor(private readonly routingOrchestrator: RoutingOrchestrator) {}

  performFailover(context: DeliveryContext, previouslyFailedProviderNames: string[]): RoutingResult | null {
    // Delegates provider selection to the orchestrator, excluding previously failed providers
    return this.routingOrchestrator.selectProvider(context, previouslyFailedProviderNames);
  }
}
