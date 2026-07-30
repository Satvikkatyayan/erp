import { Injectable, Inject } from '@nestjs/common';
import { ProviderRegistryInterface, ProviderRegistration } from '../../contracts/provider-registry.interface';
import { ProviderEligibilityInterface } from '../contracts/provider-eligibility.interface';
import { RoutingPolicyInterface } from '../contracts/routing-policy.interface';
import { DeliveryContext } from '../../domain/delivery-context';
import { randomUUID } from 'crypto';

export class RoutingResult {
  constructor(
    public readonly routingDecisionId: string,
    public readonly provider: ProviderRegistration
  ) {
    Object.freeze(this);
  }
}

@Injectable()
export class RoutingOrchestrator {
  constructor(
    @Inject('ProviderRegistryInterface')
    private readonly providerRegistry: ProviderRegistryInterface,
    @Inject('ProviderEligibilityInterface')
    private readonly eligibilityService: ProviderEligibilityInterface,
    @Inject('RoutingPolicyInterface')
    private readonly policyService: RoutingPolicyInterface
  ) {}

  selectProvider(context: DeliveryContext, excludedProviderNames: string[] = []): RoutingResult | null {
    const allProviders = this.providerRegistry.getAllProviders();

    // Eligibility Evaluation
    const eligibleProviders = allProviders.filter(provider => 
      this.eligibilityService.isEligible(provider, context) &&
      !excludedProviderNames.includes(provider.descriptor.name)
    );

    if (eligibleProviders.length === 0) {
      return null;
    }

    // Policy Evaluation
    const selectedProvider = this.policyService.selectProvider(eligibleProviders, context);

    // Generate immutable decision ID
    const routingDecisionId = randomUUID();

    return new RoutingResult(routingDecisionId, selectedProvider);
  }
}
