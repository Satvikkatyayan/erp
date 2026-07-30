export class GetEmployeeSummaryQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
