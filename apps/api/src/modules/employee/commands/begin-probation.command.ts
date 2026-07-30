export class BeginProbationCommand {
  constructor(
    public readonly tenantId: string,
    public readonly employeeId: string
  ) {}
}
