export class WorkflowIdentity {
  constructor(
    public readonly workflowId: string,
    public readonly correlationId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
