export class GetCurrentAssignmentQuery {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
