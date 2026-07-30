import { DomainEvent } from '../../../../core/events/interfaces/domain-event.interface';
export declare class PayrollRunCreatedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class PayrollCollectionStartedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class PayrollSnapshotsGeneratedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class PayrollSnapshotCreatedEvent implements DomainEvent<any> {
    readonly snapshotId: string;
    readonly runId: string;
    readonly employeeId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(snapshotId: string, runId: string, employeeId: string);
}
export declare class PayrollCalculationCreatedEvent implements DomainEvent<any> {
    readonly calculationId: string | null;
    readonly runId: string;
    readonly employeeId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(calculationId: string | null, runId: string, employeeId: string);
}
export declare class PayrollCalculationCompletedEvent implements DomainEvent<any> {
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string);
}
export declare class PayrollApprovedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class PayrollProcessedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class PayrollCancelledEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, tenantId: string);
}
export declare class EmployeePayrollRegeneratedEvent implements DomainEvent<any> {
    readonly runId: string;
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string, employeeId: string, tenantId: string);
}
export declare class PayslipGeneratedEvent implements DomainEvent<any> {
    readonly payslipId: string;
    readonly runId: string;
    readonly employeeId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(payslipId: string, runId: string, employeeId: string);
}
export declare class PayrollRunLockedEvent implements DomainEvent<any> {
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(runId: string);
}
export declare class PayslipRegeneratedEvent implements DomainEvent<any> {
    readonly payslipId: string;
    readonly runId: string;
    readonly employeeId: string;
    readonly newVersion: number;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(payslipId: string, runId: string, employeeId: string, newVersion: number);
}
export declare class PayslipVersionCreatedEvent implements DomainEvent<any> {
    readonly payslipId: string;
    readonly runId: string;
    readonly employeeId: string;
    readonly versionNumber: number;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(payslipId: string, runId: string, employeeId: string, versionNumber: number);
}
export declare class PayrollJournalGeneratedEvent implements DomainEvent<any> {
    readonly journalId: string;
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(journalId: string, runId: string, tenantId: string);
}
export declare class PayrollJournalVersionCreatedEvent implements DomainEvent<any> {
    readonly journalId: string;
    readonly runId: string;
    readonly tenantId: string;
    readonly versionNumber: number;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(journalId: string, runId: string, tenantId: string, versionNumber: number);
}
export declare class PaymentBatchCreatedEvent implements DomainEvent<any> {
    readonly batchId: string;
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(batchId: string, runId: string, tenantId: string);
}
export declare class PaymentBatchApprovedEvent implements DomainEvent<any> {
    readonly batchId: string;
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(batchId: string, runId: string, tenantId: string);
}
export declare class PaymentBatchExportedEvent implements DomainEvent<any> {
    readonly batchId: string;
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(batchId: string, runId: string, tenantId: string);
}
export declare class PayrollAdjustmentCreatedEvent implements DomainEvent<any> {
    readonly adjustmentId: string;
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(adjustmentId: string, employeeId: string, tenantId: string);
}
export declare class PayrollAdjustmentAppliedEvent implements DomainEvent<any> {
    readonly adjustmentId: string;
    readonly runId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(adjustmentId: string, runId: string, tenantId: string);
}
export declare class ArrearGeneratedEvent implements DomainEvent<any> {
    readonly arrearId: string;
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(arrearId: string, employeeId: string, tenantId: string);
}
//# sourceMappingURL=payroll.events.d.ts.map