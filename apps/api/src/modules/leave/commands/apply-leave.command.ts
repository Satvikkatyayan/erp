export class ApplyLeaveCommand {
  constructor(
    public readonly tenantId: string,
    public readonly data: any // Strongly type with DTO later
  ) {}
}
