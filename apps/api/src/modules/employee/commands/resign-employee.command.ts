export class ResignEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly resignationDate: string
  ) {}
}
