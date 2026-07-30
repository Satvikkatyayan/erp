export class GetExitInformationQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
