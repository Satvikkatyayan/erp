import { Injectable } from '@nestjs/common';
import { RoutingPolicyInterface } from '../contracts/routing-policy.interface';
import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { DeliveryContext } from '../../domain/delivery-context';

@Injectable()
export class RoutingPolicyService implements RoutingPolicyInterface {
  selectProvider(eligibleProviders: ProviderRegistration[], context: DeliveryContext): ProviderRegistration {
    if (eligibleProviders.length === 0) {
      throw new Error('No eligible providers to select from');
    }
    
    return [...eligibleProviders].sort((a, b) => {
      if (a.descriptor.priority !== b.descriptor.priority) {
        return b.descriptor.priority - a.descriptor.priority; 
      }
      return a.descriptor.name.localeCompare(b.descriptor.name);
    })[0];
  }
}
