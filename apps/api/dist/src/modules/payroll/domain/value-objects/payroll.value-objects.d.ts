export declare class Money {
    readonly amount: number;
    readonly currencyId: string;
    constructor(amount: number, currencyId: string);
}
export declare class PayrollPeriod {
    readonly startDate: Date;
    readonly endDate: Date;
    readonly attendanceLockDate: Date;
    readonly leaveLockDate: Date;
    constructor(startDate: Date, endDate: Date, attendanceLockDate: Date, leaveLockDate: Date);
}
export declare class FormulaReference {
    readonly formulaVersionId: string;
    constructor(formulaVersionId: string);
}
export declare class SalaryComponentValue {
    readonly componentId: string;
    readonly value: number;
    constructor(componentId: string, value: number);
}
export declare class CalculationTrace {
    readonly traceHash: string;
    readonly sequence: number;
    constructor(traceHash: string, sequence: number);
}
export declare class VersionIdentifier {
    readonly version: number;
    constructor(version: number);
}
export declare class Checksum {
    readonly hash: string;
    constructor(hash: string);
}
//# sourceMappingURL=payroll.value-objects.d.ts.map