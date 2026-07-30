import { ProviderRegistryInterface, ProviderRegistration } from '../contracts/provider-registry.interface';
import { Channel } from '../domain/channel.enum';
import { ProviderCapability } from '../domain/provider-capability';
export declare class ProviderResolver {
    private readonly registry;
    constructor(registry: ProviderRegistryInterface);
    resolve(channel: Channel, requiredCapabilities: Partial<ProviderCapability>): ProviderRegistration;
}
//# sourceMappingURL=provider.resolver.d.ts.map