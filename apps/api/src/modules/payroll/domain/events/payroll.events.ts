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
