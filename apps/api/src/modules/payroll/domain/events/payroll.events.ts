import { DomainEvent } from '../../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class PayrollRunCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollRunCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class PayrollCollectionStartedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollCollectionStartedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class PayrollSnapshotsGeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollSnapshotsGeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class PayrollSnapshotCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollSnapshotCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly snapshotId: string, public readonly runId: string, public readonly employeeId: string) { this.payload = { runId, employeeId }; }
}

export class PayrollCalculationCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollCalculationCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly calculationId: string | null, public readonly runId: string, public readonly employeeId: string) { this.payload = { runId, employeeId }; }
}

export class PayrollCalculationCompletedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollCalculationCompletedEvent';
  timestamp = new Date();
  version = 1;
  payload: any = {};
  constructor(public readonly runId: string) {}
}

export class PayrollApprovedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollApprovedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class PayrollProcessedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollProcessedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class PayrollCancelledEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollCancelledEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly tenantId: string) { this.payload = { tenantId }; }
}

export class EmployeePayrollRegeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeePayrollRegeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly runId: string, public readonly employeeId: string, public readonly tenantId: string) { this.payload = { runId, employeeId, tenantId }; }
}

export class PayslipGeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayslipGeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly payslipId: string, public readonly runId: string, public readonly employeeId: string) { this.payload = { runId, employeeId }; }
}

export class PayrollRunLockedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollRunLockedEvent';
  timestamp = new Date();
  version = 1;
  payload: any = {};
  constructor(public readonly runId: string) {}
}

export class PayslipRegeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayslipRegeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly payslipId: string, public readonly runId: string, public readonly employeeId: string, public readonly newVersion: number) { this.payload = { runId, employeeId, newVersion }; }
}

export class PayslipVersionCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayslipVersionCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly payslipId: string, public readonly runId: string, public readonly employeeId: string, public readonly versionNumber: number) { this.payload = { runId, employeeId, versionNumber }; }
}

// Financial Events
export class PayrollJournalGeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollJournalGeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly journalId: string, public readonly runId: string, public readonly tenantId: string) { this.payload = { runId, tenantId }; }
}

export class PayrollJournalVersionCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollJournalVersionCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly journalId: string, public readonly runId: string, public readonly tenantId: string, public readonly versionNumber: number) { this.payload = { runId, tenantId, versionNumber }; }
}

export class PaymentBatchCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PaymentBatchCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly batchId: string, public readonly runId: string, public readonly tenantId: string) { this.payload = { runId, tenantId }; }
}

export class PaymentBatchApprovedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PaymentBatchApprovedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly batchId: string, public readonly runId: string, public readonly tenantId: string) { this.payload = { runId, tenantId }; }
}

export class PaymentBatchExportedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PaymentBatchExportedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly batchId: string, public readonly runId: string, public readonly tenantId: string) { this.payload = { runId, tenantId }; }
}

export class PayrollAdjustmentCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollAdjustmentCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly adjustmentId: string, public readonly employeeId: string, public readonly tenantId: string) { this.payload = { employeeId, tenantId }; }
}

export class PayrollAdjustmentAppliedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollAdjustmentAppliedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly adjustmentId: string, public readonly runId: string, public readonly tenantId: string) { this.payload = { runId, tenantId }; }
}

export class ArrearGeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'ArrearGeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly arrearId: string, public readonly employeeId: string, public readonly tenantId: string) { this.payload = { employeeId, tenantId }; }
}
