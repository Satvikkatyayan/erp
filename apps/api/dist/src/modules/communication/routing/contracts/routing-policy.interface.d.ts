import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { DeliveryContext } from '../../domain/delivery-context';
export interface RoutingPolicyInterface {
    selectProvider(eligibleProviders: ProviderRegistration[], context: DeliveryContext): ProviderRegistration;
}
//# sourceMappingURL=routing-policy.interface.d.ts.map