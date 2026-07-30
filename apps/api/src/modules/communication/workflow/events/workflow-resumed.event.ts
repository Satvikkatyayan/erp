export class WorkflowResumedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly workflowId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
