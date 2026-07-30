export class TerminateEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly terminationDate: string
  ) {}
}
