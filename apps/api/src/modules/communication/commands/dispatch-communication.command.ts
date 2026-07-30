import { Channel } from '../domain/channel.enum';

export class DispatchCommunicationCommand {
  constructor(
    public readonly tenantId: string,
    public readonly recipient: string,
    public readonly channel: Channel,
    public readonly templateCode: string,
    public readonly payload: Record<string, any>
  ) {
    Object.freeze(this);
    if (this.payload) Object.freeze(this.payload);
  }
}
