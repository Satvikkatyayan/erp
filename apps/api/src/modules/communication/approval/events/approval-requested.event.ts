export class ApprovalRequestedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly approvalId: string,
    public readonly workflowId: string,
    public readonly workflowActivityId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
