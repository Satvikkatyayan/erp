export class JoinEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
