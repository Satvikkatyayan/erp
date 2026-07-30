export class RejectLeaveCommand {
  constructor(
    public readonly tenantId: string,
    public readonly data: any
  ) {}
}
