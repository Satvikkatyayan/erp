import { Channel } from './channel.enum';

export class DeliveryContext {
  public readonly tenantId: string;
  public readonly recipient: string;
  public readonly channel: Channel;
  public readonly templateCode: string;
  public readonly payload: Record<string, any>;
  public readonly correlationId: string;

  constructor(
    tenantId: string,
    recipient: string,
    channel: Channel,
    templateCode: string,
    payload: Record<string, any>,
    correlationId: string
  ) {
    this.tenantId = tenantId;
    this.recipient = recipient;
    this.channel = channel;
    this.templateCode = templateCode;
    this.payload = { ...payload }; // defensive copy
    this.correlationId = correlationId;
    Object.freeze(this);
    Object.freeze(this.payload);
  }
}
