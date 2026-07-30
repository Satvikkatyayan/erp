import { DeliveryContext } from '../../domain/delivery-context';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';

export interface ProviderEligibilityInterface {
  isEligible(registration: ProviderRegistration, context: DeliveryContext): boolean;
}
