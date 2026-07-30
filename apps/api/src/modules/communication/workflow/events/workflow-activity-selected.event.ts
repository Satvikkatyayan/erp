export class WorkflowActivitySelectedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly workflowId: string,
    public readonly activityId: string,
    public readonly activityType: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
