import { Channel } from './channel.enum';
export interface ProviderCapability {
    readonly supportedChannels: Channel[];
    readonly supportsHtml: boolean;
    readonly supportsAttachments: boolean;
    readonly supportsRichMedia: boolean;
    readonly supportsNativeTemplates: boolean;
    readonly maxPayloadBytes?: number;
}
//# sourceMappingURL=provider-capability.d.ts.map