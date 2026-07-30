import { Injectable, Inject } from '@nestjs/common';
import { ProviderRegistryInterface, ProviderRegistration } from '../contracts/provider-registry.interface';
import { Channel } from '../domain/channel.enum';
import { ProviderCapability } from '../domain/provider-capability';
import { ProviderResolutionException } from '../exceptions/provider-resolution.exception';

@Injectable()
export class ProviderResolver {
  constructor(
    @Inject('ProviderRegistryInterface')
    private readonly registry: ProviderRegistryInterface
  ) {}

  resolve(channel: Channel, requiredCapabilities: Partial<ProviderCapability>): ProviderRegistration {
    const allProviders = this.registry.getAllProviders();

    // 1. Filter by Channel
    // 2. Exclude disabled
    // 3. Filter by Capabilities
    const eligibleProviders = allProviders.filter(p => {
      if (!p.descriptor.enabled) return false;
      if (!p.capabilities.supportedChannels.includes(channel)) return false;

      if (requiredCapabilities.supportsHtml !== undefined && requiredCapabilities.supportsHtml && !p.capabilities.supportsHtml) return false;
      if (requiredCapabilities.supportsAttachments !== undefined && requiredCapabilities.supportsAttachments && !p.capabilities.supportsAttachments) return false;
      if (requiredCapabilities.supportsRichMedia !== undefined && requiredCapabilities.supportsRichMedia && !p.capabilities.supportsRichMedia) return false;
      if (requiredCapabilities.supportsNativeTemplates !== undefined && requiredCapabilities.supportsNativeTemplates && !p.capabilities.supportsNativeTemplates) return false;

      return true;
    });

    if (eligibleProviders.length === 0) {
      throw new ProviderResolutionException(channel, requiredCapabilities);
    }

    // 4. Sort by Priority DESC
    // 5. Tie-break alphabetically by Name ASC
    eligibleProviders.sort((a, b) => {
      if (a.descriptor.priority !== b.descriptor.priority) {
        return b.descriptor.priority - a.descriptor.priority; 
      }
      return a.descriptor.name.localeCompare(b.descriptor.name);
    });

    return eligibleProviders[0];
  }
}
