export class ApprovalAssignmentCreatedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly approvalId: string,
    public readonly approvalAssignmentId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
