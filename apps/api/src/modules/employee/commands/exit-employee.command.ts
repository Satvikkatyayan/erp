export class ExitEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly exitDate: string
  ) {}
}
