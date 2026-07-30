export class GetEmployeeTimelineQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
