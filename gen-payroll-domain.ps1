$payrollDir = "d:\erpvvinfratech\apps\api\src\modules\payroll"
$eventsDir = "$payrollDir\domain\events"
$voDir = "$payrollDir\domain\value-objects"
$repoDir = "$payrollDir\repositories"
$svcDir = "$payrollDir\services"

New-Item -ItemType Directory -Force -Path $eventsDir | Out-Null
New-Item -ItemType Directory -Force -Path $voDir | Out-Null
New-Item -ItemType Directory -Force -Path $repoDir | Out-Null
New-Item -ItemType Directory -Force -Path $svcDir | Out-Null

$events = @"
export class PayrollRunCreatedEvent {
  constructor(public readonly runId: string, public readonly tenantId: string) {}
}

export class PayrollSnapshotCreatedEvent {
  constructor(public readonly snapshotId: string, public readonly runId: string, public readonly employeeId: string) {}
}

export class PayrollCalculationCreatedEvent {
  constructor(public readonly calculationId: string, public readonly runId: string, public readonly employeeId: string) {}
}

export class PayrollCalculationCompletedEvent {
  constructor(public readonly runId: string) {}
}

export class PayslipGeneratedEvent {
  constructor(public readonly payslipId: string, public readonly runId: string, public readonly employeeId: string) {}
}

export class PayrollRunLockedEvent {
  constructor(public readonly runId: string) {}
}
"@
Set-Content -Path "$eventsDir\payroll.events.ts" -Value $events

$valueObjects = @"
export class Money {
  constructor(public readonly amount: number, public readonly currencyId: string) {
    if (amount < 0) throw new Error('Money amount cannot be negative');
  }
}

export class PayrollPeriod {
  constructor(
    public readonly startDate: Date,
    public readonly endDate: Date,
    public readonly attendanceLockDate: Date,
    public readonly leaveLockDate: Date
  ) {}
}

export class FormulaReference {
  constructor(public readonly formulaVersionId: string) {}
}

export class SalaryComponentValue {
  constructor(public readonly componentId: string, public readonly value: number) {}
}

export class CalculationTrace {
  constructor(public readonly traceHash: string, public readonly sequence: number) {}
}

export class VersionIdentifier {
  constructor(public readonly version: number) {}
}

export class Checksum {
  constructor(public readonly hash: string) {}
}
"@
Set-Content -Path "$voDir\payroll.value-objects.ts" -Value $valueObjects
