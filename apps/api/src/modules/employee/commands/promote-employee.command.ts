export class PromoteEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly newAssignmentData: any
  ) {}
}
