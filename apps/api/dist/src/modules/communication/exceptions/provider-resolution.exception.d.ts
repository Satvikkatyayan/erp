import { Channel } from '../domain/channel.enum';
import { ProviderCapability } from '../domain/provider-capability';
export declare class ProviderResolutionException extends Error {
    readonly requestedChannel: Channel;
    readonly requestedCapabilities: Partial<ProviderCapability>;
    constructor(channel: Channel, capabilities: Partial<ProviderCapability>, message?: string);
}
//# sourceMappingURL=provider-resolution.exception.d.ts.map