export class GetEmployeeProfileQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
