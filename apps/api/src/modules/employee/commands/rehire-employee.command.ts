export class RehireEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly initialAssignmentData: any
  ) {}
}
