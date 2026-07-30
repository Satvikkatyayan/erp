export class DeliveryFailedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly tenantId: string,
    public readonly channel: string,
    public readonly stage: string,
    public readonly errorCode: string,
    public readonly errorMessage: string
  ) {}
}
