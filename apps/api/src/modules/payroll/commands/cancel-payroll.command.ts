export class CancelPayrollCommand {
  constructor(
    public readonly ctx: any,
    public readonly runId: string
  ) {}
}
