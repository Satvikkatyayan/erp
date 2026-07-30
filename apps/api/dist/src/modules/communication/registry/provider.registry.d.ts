import { OnModuleInit } from '@nestjs/common';
import { ProviderRegistryInterface, ProviderRegistration } from '../contracts/provider-registry.interface';
export declare class ProviderRegistry implements ProviderRegistryInterface, OnModuleInit {
    private readonly providers;
    private isInitialized;
    onModuleInit(): void;
    register(registration: ProviderRegistration): void;
    getAllProviders(): ProviderRegistration[];
}
//# sourceMappingURL=provider.registry.d.ts.map