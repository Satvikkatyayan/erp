import { ProviderRegistryInterface, ProviderRegistration } from '../../contracts/provider-registry.interface';
import { ProviderEligibilityInterface } from '../contracts/provider-eligibility.interface';
import { RoutingPolicyInterface } from '../contracts/routing-policy.interface';
import { DeliveryContext } from '../../domain/delivery-context';
export declare class RoutingResult {
    readonly routingDecisionId: string;
    readonly provider: ProviderRegistration;
    constructor(routingDecisionId: string, provider: ProviderRegistration);
}
export declare class RoutingOrchestrator {
    private readonly providerRegistry;
    private readonly eligibilityService;
    private readonly policyService;
    constructor(providerRegistry: ProviderRegistryInterface, eligibilityService: ProviderEligibilityInterface, policyService: RoutingPolicyInterface);
    selectProvider(context: DeliveryContext, excludedProviderNames?: string[]): RoutingResult | null;
}
//# sourceMappingURL=routing.orchestrator.d.ts.map