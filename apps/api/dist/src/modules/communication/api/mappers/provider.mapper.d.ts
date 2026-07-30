import { ProviderRegistration } from '../../contracts/provider-registry.interface';
import { ProviderRegistrationDto } from '../dtos/provider-responses.dto';
export declare class ProviderMapper {
    mapToResponseDto(registrations: ProviderRegistration[]): ProviderRegistrationDto[];
    success<T>(data: T, message?: string): {
        success: boolean;
        message: string;
        data: T;
    };
}
//# sourceMappingURL=provider.mapper.d.ts.map