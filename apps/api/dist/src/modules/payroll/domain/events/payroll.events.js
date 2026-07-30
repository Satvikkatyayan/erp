"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrearGeneratedEvent = exports.PayrollAdjustmentAppliedEvent = exports.PayrollAdjustmentCreatedEvent = exports.PaymentBatchExportedEvent = exports.PaymentBatchApprovedEvent = exports.PaymentBatchCreatedEvent = exports.PayrollJournalVersionCreatedEvent = exports.PayrollJournalGeneratedEvent = exports.PayslipVersionCreatedEvent = exports.PayslipRegeneratedEvent = exports.PayrollRunLockedEvent = exports.PayslipGeneratedEvent = exports.EmployeePayrollRegeneratedEvent = exports.PayrollCancelledEvent = exports.PayrollProcessedEvent = exports.PayrollApprovedEvent = exports.PayrollCalculationCompletedEvent = exports.PayrollCalculationCreatedEvent = exports.PayrollSnapshotCreatedEvent = exports.PayrollSnapshotsGeneratedEvent = exports.PayrollCollectionStartedEvent = exports.PayrollRunCreatedEvent = void 0;
const uuid_1 = require("uuid");
class PayrollRunCreatedEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollRunCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollRunCreatedEvent = PayrollRunCreatedEvent;
class PayrollCollectionStartedEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollCollectionStartedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollCollectionStartedEvent = PayrollCollectionStartedEvent;
class PayrollSnapshotsGeneratedEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollSnapshotsGeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollSnapshotsGeneratedEvent = PayrollSnapshotsGeneratedEvent;
class PayrollSnapshotCreatedEvent {
    constructor(snapshotId, runId, employeeId) {
        this.snapshotId = snapshotId;
        this.runId = runId;
        this.employeeId = employeeId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollSnapshotCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId };
    }
}
exports.PayrollSnapshotCreatedEvent = PayrollSnapshotCreatedEvent;
class PayrollCalculationCreatedEvent {
    constructor(calculationId, runId, employeeId) {
        this.calculationId = calculationId;
        this.runId = runId;
        this.employeeId = employeeId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollCalculationCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId };
    }
}
exports.PayrollCalculationCreatedEvent = PayrollCalculationCreatedEvent;
class PayrollCalculationCompletedEvent {
    constructor(runId) {
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollCalculationCompletedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = {};
    }
}
exports.PayrollCalculationCompletedEvent = PayrollCalculationCompletedEvent;
class PayrollApprovedEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollApprovedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollApprovedEvent = PayrollApprovedEvent;
class PayrollProcessedEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollProcessedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollProcessedEvent = PayrollProcessedEvent;
class PayrollCancelledEvent {
    constructor(runId, tenantId) {
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollCancelledEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { tenantId };
    }
}
exports.PayrollCancelledEvent = PayrollCancelledEvent;
class EmployeePayrollRegeneratedEvent {
    constructor(runId, employeeId, tenantId) {
        this.runId = runId;
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeePayrollRegeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId, tenantId };
    }
}
exports.EmployeePayrollRegeneratedEvent = EmployeePayrollRegeneratedEvent;
class PayslipGeneratedEvent {
    constructor(payslipId, runId, employeeId) {
        this.payslipId = payslipId;
        this.runId = runId;
        this.employeeId = employeeId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayslipGeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId };
    }
}
exports.PayslipGeneratedEvent = PayslipGeneratedEvent;
class PayrollRunLockedEvent {
    constructor(runId) {
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollRunLockedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = {};
    }
}
exports.PayrollRunLockedEvent = PayrollRunLockedEvent;
class PayslipRegeneratedEvent {
    constructor(payslipId, runId, employeeId, newVersion) {
        this.payslipId = payslipId;
        this.runId = runId;
        this.employeeId = employeeId;
        this.newVersion = newVersion;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayslipRegeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId, newVersion };
    }
}
exports.PayslipRegeneratedEvent = PayslipRegeneratedEvent;
class PayslipVersionCreatedEvent {
    constructor(payslipId, runId, employeeId, versionNumber) {
        this.payslipId = payslipId;
        this.runId = runId;
        this.employeeId = employeeId;
        this.versionNumber = versionNumber;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayslipVersionCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId, versionNumber };
    }
}
exports.PayslipVersionCreatedEvent = PayslipVersionCreatedEvent;
class PayrollJournalGeneratedEvent {
    constructor(journalId, runId, tenantId) {
        this.journalId = journalId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollJournalGeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId };
    }
}
exports.PayrollJournalGeneratedEvent = PayrollJournalGeneratedEvent;
class PayrollJournalVersionCreatedEvent {
    constructor(journalId, runId, tenantId, versionNumber) {
        this.journalId = journalId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.versionNumber = versionNumber;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollJournalVersionCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId, versionNumber };
    }
}
exports.PayrollJournalVersionCreatedEvent = PayrollJournalVersionCreatedEvent;
class PaymentBatchCreatedEvent {
    constructor(batchId, runId, tenantId) {
        this.batchId = batchId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PaymentBatchCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId };
    }
}
exports.PaymentBatchCreatedEvent = PaymentBatchCreatedEvent;
class PaymentBatchApprovedEvent {
    constructor(batchId, runId, tenantId) {
        this.batchId = batchId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PaymentBatchApprovedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId };
    }
}
exports.PaymentBatchApprovedEvent = PaymentBatchApprovedEvent;
class PaymentBatchExportedEvent {
    constructor(batchId, runId, tenantId) {
        this.batchId = batchId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PaymentBatchExportedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId };
    }
}
exports.PaymentBatchExportedEvent = PaymentBatchExportedEvent;
class PayrollAdjustmentCreatedEvent {
    constructor(adjustmentId, employeeId, tenantId) {
        this.adjustmentId = adjustmentId;
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollAdjustmentCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.PayrollAdjustmentCreatedEvent = PayrollAdjustmentCreatedEvent;
class PayrollAdjustmentAppliedEvent {
    constructor(adjustmentId, runId, tenantId) {
        this.adjustmentId = adjustmentId;
        this.runId = runId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollAdjustmentAppliedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId };
    }
}
exports.PayrollAdjustmentAppliedEvent = PayrollAdjustmentAppliedEvent;
class ArrearGeneratedEvent {
    constructor(arrearId, employeeId, tenantId) {
        this.arrearId = arrearId;
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'ArrearGeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.ArrearGeneratedEvent = ArrearGeneratedEvent;
//# sourceMappingURL=payroll.events.js.map