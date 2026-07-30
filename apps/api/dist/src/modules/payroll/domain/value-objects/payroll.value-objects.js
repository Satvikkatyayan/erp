"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checksum = exports.VersionIdentifier = exports.CalculationTrace = exports.SalaryComponentValue = exports.FormulaReference = exports.PayrollPeriod = exports.Money = void 0;
class Money {
    constructor(amount, currencyId) {
        this.amount = amount;
        this.currencyId = currencyId;
        if (amount < 0)
            throw new Error('Money amount cannot be negative');
    }
}
exports.Money = Money;
class PayrollPeriod {
    constructor(startDate, endDate, attendanceLockDate, leaveLockDate) {
        this.startDate = startDate;
        this.endDate = endDate;
        this.attendanceLockDate = attendanceLockDate;
        this.leaveLockDate = leaveLockDate;
    }
}
exports.PayrollPeriod = PayrollPeriod;
class FormulaReference {
    constructor(formulaVersionId) {
        this.formulaVersionId = formulaVersionId;
    }
}
exports.FormulaReference = FormulaReference;
class SalaryComponentValue {
    constructor(componentId, value) {
        this.componentId = componentId;
        this.value = value;
    }
}
exports.SalaryComponentValue = SalaryComponentValue;
class CalculationTrace {
    constructor(traceHash, sequence) {
        this.traceHash = traceHash;
        this.sequence = sequence;
    }
}
exports.CalculationTrace = CalculationTrace;
class VersionIdentifier {
    constructor(version) {
        this.version = version;
    }
}
exports.VersionIdentifier = VersionIdentifier;
class Checksum {
    constructor(hash) {
        this.hash = hash;
    }
}
exports.Checksum = Checksum;
//# sourceMappingURL=payroll.value-objects.js.map