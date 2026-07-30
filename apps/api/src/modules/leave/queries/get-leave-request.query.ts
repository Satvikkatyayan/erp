export class GetLeaveRequestQuery {
  constructor(
    public readonly tenantId: string,
    public readonly leaveRequestId: string
  ) {}
}
