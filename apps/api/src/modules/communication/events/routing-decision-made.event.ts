export class RoutingDecisionMadeEvent {
  constructor(
    public readonly correlationId: string,
    public readonly routingDecisionId: string,
    public readonly selectedProviderId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
