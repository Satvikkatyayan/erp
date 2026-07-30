export class ConfirmEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string,
    public readonly confirmedBy: string,
    public readonly confirmedAt: Date
  ) {}
}
