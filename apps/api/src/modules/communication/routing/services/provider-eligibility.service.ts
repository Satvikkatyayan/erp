import { Injectable } from '@nestjs/common';
import { ProviderEligibilityInterface } from '../contracts/provider-eligibility.interface';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { DeliveryContext } from '../../domain/delivery-context';

@Injectable()
export class ProviderEligibilityService implements ProviderEligibilityInterface {
  isEligible(registration: ProviderRegistration, context: DeliveryContext): boolean {
    if (!registration.descriptor.enabled) return false;
    if (!registration.capabilities.supportedChannels.includes(context.channel)) return false;
    
    // Further capability validation checks go here
    return true;
  }
}
