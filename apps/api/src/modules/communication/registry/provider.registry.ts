import { Injectable, OnModuleInit } from '@nestjs/common';
import { ProviderRegistryInterface, ProviderRegistration } from '../contracts/provider-registry.interface';

@Injectable()
export class ProviderRegistry implements ProviderRegistryInterface, OnModuleInit {
  private readonly providers: ProviderRegistration[] = [];
  private isInitialized = false;

  onModuleInit() {
    this.isInitialized = true;
  }

  register(registration: ProviderRegistration): void {
    if (this.isInitialized) {
      throw new Error('Provider registration is only allowed during application initialization.');
    }
    this.providers.push(registration);
  }

  getAllProviders(): ProviderRegistration[] {
    return [...this.providers];
  }
}
