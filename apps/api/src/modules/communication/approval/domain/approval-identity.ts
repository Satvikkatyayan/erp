export class ApprovalIdentity {
  constructor(
    public readonly approvalId: string,
    public readonly workflowId: string,
    public readonly workflowActivityId: string,
    public readonly correlationId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
