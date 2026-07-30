export class GetEmploymentStatusQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
