import { ProviderEligibilityInterface } from '../contracts/provider-eligibility.interface';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { DeliveryContext } from '../../domain/delivery-context';
export declare class ProviderEligibilityService implements ProviderEligibilityInterface {
    isEligible(registration: ProviderRegistration, context: DeliveryContext): boolean;
}
//# sourceMappingURL=provider-eligibility.service.d.ts.map