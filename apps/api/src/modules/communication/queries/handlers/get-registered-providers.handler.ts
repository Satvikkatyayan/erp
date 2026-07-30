import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetRegisteredProvidersQuery } from '../get-registered-providers.query';
import { ProviderRegistryInterface, ProviderRegistration } from '../../contracts/provider-registry.interface';
import { Inject } from '@nestjs/common';

@QueryHandler(GetRegisteredProvidersQuery)
export class GetRegisteredProvidersHandler implements IQueryHandler<GetRegisteredProvidersQuery> {
  constructor(
    @Inject('ProviderRegistryInterface')
    private readonly registry: ProviderRegistryInterface
  ) {}

  async execute(query: GetRegisteredProvidersQuery): Promise<ProviderRegistration[]> {
    return this.registry.getAllProviders();
  }
}
