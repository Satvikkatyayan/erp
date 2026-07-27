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
