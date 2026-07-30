export class ApprovalAssignmentIdentity {
  constructor(
    public readonly approvalAssignmentId: string,
    public readonly approvalId: string,
    public readonly workflowId: string,
    public readonly workflowActivityId: string,
    public readonly correlationId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
