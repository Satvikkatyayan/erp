import { QueryBus } from '@nestjs/cqrs';
import { ProviderMapper } from '../api/mappers/provider.mapper';
export declare class ProviderQueryController {
    private readonly queryBus;
    private readonly providerMapper;
    constructor(queryBus: QueryBus, providerMapper: ProviderMapper);
    getRegisteredProviders(): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/provider-responses.dto").ProviderRegistrationDto[];
    }>;
}
//# sourceMappingURL=provider-query.controller.d.ts.map