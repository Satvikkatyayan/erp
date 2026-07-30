export class DeliveryDispatchedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly tenantId: string,
    public readonly channel: string,
    public readonly templateCode: string
  ) {}
}
