import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class EmployeeCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeJoinedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeJoinedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeConfirmedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeConfirmedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeTransferredEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeTransferredEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string, public readonly newJobAssignmentId: string) {
    this.payload = { employeeId, tenantId, newJobAssignmentId };
  }
}

export class EmployeePromotedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeePromotedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string, public readonly newPositionId: string) {
    this.payload = { employeeId, tenantId, newPositionId };
  }
}

export class EmployeeExitedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeExitedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string, public readonly exitDate: string) {
    this.payload = { employeeId, tenantId, exitDate };
  }
}

export class EmployeeRehiredEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeRehiredEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeTerminatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeTerminatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string, public readonly terminationDate: string) {
    this.payload = { employeeId, tenantId, terminationDate };
  }
}

export class EmployeeResignedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeResignedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string, public readonly resignationDate: string) {
    this.payload = { employeeId, tenantId, resignationDate };
  }
}

export class EmployeeProbationStartedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeProbationStartedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeTimelineCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeTimelineCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class EmployeeSnapshotCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeeSnapshotCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}

export class WelcomeMailRequestedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'WelcomeMailRequestedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;

  constructor(public readonly employeeId: string, public readonly tenantId: string) {
    this.payload = { employeeId, tenantId };
  }
}
