export class RoutingExhaustedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly tenantId: string,
    public readonly channel: string
  ) {
    Object.freeze(this);
  }
}
