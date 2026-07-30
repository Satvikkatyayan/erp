export class DeliveryCompletedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly tenantId: string,
    public readonly channel: string,
    public readonly providerName: string
  ) {}
}
