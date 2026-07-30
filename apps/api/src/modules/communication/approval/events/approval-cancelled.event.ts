export class ApprovalCancelledEvent {
  constructor(
    public readonly correlationId: string,
    public readonly approvalId: string,
    public readonly reason: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
