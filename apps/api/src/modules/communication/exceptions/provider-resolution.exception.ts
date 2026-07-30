import { Channel } from '../domain/channel.enum';
import { ProviderCapability } from '../domain/provider-capability';

export class ProviderResolutionException extends Error {
  public readonly requestedChannel: Channel;
  public readonly requestedCapabilities: Partial<ProviderCapability>;

  constructor(channel: Channel, capabilities: Partial<ProviderCapability>, message: string = 'No eligible provider found') {
    super(`Provider Resolution Failed: ${message}. Channel: ${channel}`);
    this.name = 'ProviderResolutionException';
    this.requestedChannel = channel;
    this.requestedCapabilities = capabilities;
  }
}
