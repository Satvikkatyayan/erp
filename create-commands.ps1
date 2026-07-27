$basePath = "d:\erpvvinfratech\apps\api\src\modules\attendance\commands"

$commands = @(
  @("submit-attendance", "SubmitAttendance"),
  @("validate-attendance", "ValidateAttendance"),
  @("request-correction", "RequestCorrection"),
  @("approve-correction", "ApproveCorrection"),
  @("reject-correction", "RejectCorrection"),
  @("reopen-attendance", "ReopenAttendance"),
  @("start-review", "StartReview"),
  @("lock-attendance", "LockAttendance")
)

foreach ($item in $commands) {
  $kebab = $item[0]
  $name = $item[1]

  $content = @"
export class $($name)Command {
  constructor(
    public readonly musterId: string,
    public readonly actorId: string,
    public readonly actorRoles: string[],
    public readonly correlationId: string,
    public readonly reason?: string
  ) {}
}
"@
  Set-Content -Path "$basePath\$kebab.command.ts" -Value $content
}
