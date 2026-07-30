export class GetLeaveBalancesQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
