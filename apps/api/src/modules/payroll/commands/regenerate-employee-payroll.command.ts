export class RegenerateEmployeePayrollCommand {
  constructor(
    public readonly ctx: any,
    public readonly runId: string,
    public readonly employeeId: string,
    public readonly currencyId: string
  ) {}
}
