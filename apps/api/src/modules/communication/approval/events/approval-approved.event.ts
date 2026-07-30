export class ApprovalApprovedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly approvalId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
