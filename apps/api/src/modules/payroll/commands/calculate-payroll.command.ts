export class CalculatePayrollCommand {
  constructor(
    public readonly ctx: any,
    public readonly runId: string,
    public readonly currencyId: string
  ) {}
}
