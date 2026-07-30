export class RoutingFailoverTriggeredEvent {
  constructor(
    public readonly correlationId: string,
    public readonly routingDecisionId: string,
    public readonly previousProviderId: string,
    public readonly selectedProviderId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
