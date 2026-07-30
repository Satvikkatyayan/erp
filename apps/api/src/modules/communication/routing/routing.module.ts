import { Module } from '@nestjs/common';
import { ProviderEligibilityService } from './services/provider-eligibility.service';
import { RoutingPolicyService } from './services/routing-policy.service';
import { RoutingOrchestrator } from './orchestrator/routing.orchestrator';
import { FailoverCoordinator } from './coordinator/failover.coordinator';

@Module({
  providers: [
    {
      provide: 'ProviderEligibilityInterface',
      useClass: ProviderEligibilityService,
    },
    {
      provide: 'RoutingPolicyInterface',
      useClass: RoutingPolicyService,
    },
    RoutingOrchestrator,
    FailoverCoordinator,
    // Wait, ProviderRegistry is provided in CommunicationModule. 
    // This module will be imported into CommunicationModule.
  ],
  exports: [
    RoutingOrchestrator,
    FailoverCoordinator,
  ]
})
export class RoutingModule {}
