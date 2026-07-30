import { CommunicationProviderInterface } from './communication-provider.interface';
import { ProviderDescriptor } from '../domain/provider-descriptor';
import { ProviderCapability } from '../domain/provider-capability';
export interface ProviderRegistration {
    provider: CommunicationProviderInterface;
    descriptor: ProviderDescriptor;
    capabilities: ProviderCapability;
}
export interface ProviderRegistryInterface {
    register(registration: ProviderRegistration): void;
    getAllProviders(): ProviderRegistration[];
}
//# sourceMappingURL=provider-registry.interface.d.ts.map