export class CancelLeaveCommand {
  constructor(
    public readonly tenantId: string,
    public readonly data: any
  ) {}
}
