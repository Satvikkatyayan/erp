import { Channel } from '../../domain/channel.enum';
export declare class ProviderDescriptorDto {
    name: string;
    type: string;
    version: string;
    enabled: boolean;
    priority: number;
}
export declare class ProviderCapabilityDto {
    supportedChannels: Channel[];
    supportsHtml: boolean;
    supportsAttachments: boolean;
    supportsRichMedia: boolean;
    supportsNativeTemplates: boolean;
    maxPayloadBytes?: number;
}
export declare class ProviderRegistrationDto {
    descriptor: ProviderDescriptorDto;
    capabilities: ProviderCapabilityDto;
}
//# sourceMappingURL=provider-responses.dto.d.ts.map