export class GenerateAttendanceSummaryCommand {
  constructor(
    public readonly employeeId: string,
    public readonly payrollPeriodId: string,
    public readonly generatedById?: string
  ) {}
}
