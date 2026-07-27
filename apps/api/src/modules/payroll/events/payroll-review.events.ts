import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { v4 as uuidv4 } from 'uuid';

export class PayrollReviewStartedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollReviewStartedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class PayrollReviewCompletedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollReviewCompletedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class PayrollApprovedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollApprovedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(
    public readonly ctx: PlatformContext,
    public readonly runId: string,
    workflowId?: string,
    workflowVersion?: number,
    stepNumber?: number,
    roleCode?: string,
    roleDisplayName?: string,
    reviewStatus?: string
  ) {
    this.payload = { runId, tenantId: ctx.tenantId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus };
  }
}

export class PayrollRejectedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollRejectedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(
    public readonly ctx: PlatformContext,
    public readonly runId: string,
    workflowId?: string,
    workflowVersion?: number,
    stepNumber?: number,
    roleCode?: string,
    roleDisplayName?: string,
    reviewStatus?: string
  ) {
    this.payload = { runId, tenantId: ctx.tenantId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus };
  }
}

export class PayrollLockedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollLockedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class PayrollProcessedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollProcessedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class PayrollCancelledEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollCancelledEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class PayrollReopenedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'PayrollReopenedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string) {
    this.payload = { runId, tenantId: ctx.tenantId };
  }
}

export class EmployeePayrollRegeneratedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'EmployeePayrollRegeneratedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string, public readonly employeeId: string) {
    this.payload = { runId, employeeId, tenantId: ctx.tenantId };
  }
}

export class ReviewAssignmentCreatedEvent implements DomainEvent<any> {
  eventId = uuidv4();
  eventName = 'ReviewAssignmentCreatedEvent';
  timestamp = new Date();
  version = 1;
  payload: any;
  constructor(public readonly ctx: PlatformContext, public readonly runId: string, public readonly reviewId: string) {
    this.payload = { runId, reviewId, tenantId: ctx.tenantId };
  }
}
