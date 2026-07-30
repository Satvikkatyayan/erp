import { IQueryHandler } from '@nestjs/cqrs';
import { GetRegisteredProvidersQuery } from '../get-registered-providers.query';
import { ProviderRegistryInterface, ProviderRegistration } from '../../contracts/provider-registry.interface';
export declare class GetRegisteredProvidersHandler implements IQueryHandler<GetRegisteredProvidersQuery> {
    private readonly registry;
    constructor(registry: ProviderRegistryInterface);
    execute(query: GetRegisteredProvidersQuery): Promise<ProviderRegistration[]>;
}
//# sourceMappingURL=get-registered-providers.handler.d.ts.map