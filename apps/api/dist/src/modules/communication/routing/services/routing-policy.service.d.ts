import { RoutingPolicyInterface } from '../contracts/routing-policy.interface';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { DeliveryContext } from '../../domain/delivery-context';
export declare class RoutingPolicyService implements RoutingPolicyInterface {
    selectProvider(eligibleProviders: ProviderRegistration[], context: DeliveryContext): ProviderRegistration;
}
//# sourceMappingURL=routing-policy.service.d.ts.map