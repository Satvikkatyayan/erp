export class OnboardEmployeeCommand {
  constructor(
    public readonly tenantId: string,
    public readonly data: any // You can type this properly later with a DTO
  ) {}
}
