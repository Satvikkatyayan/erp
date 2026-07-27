export class CreatePayrollRunCommand {
  constructor(
    public readonly ctx: any,
    public readonly periodId: string,
    public readonly runType: string
  ) {}
}
