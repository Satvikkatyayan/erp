import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class AttendanceExceptionEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly eventName: string, // e.g., AttendanceExceptionDetected, AttendanceExceptionResolved
    public readonly correlationId: string,
    public readonly payload: {
      exceptionId: string;
      musterId: string;
      type: string;
      severity: string;
      actorId?: string;
    }
  ) {}
}

export class AttendanceHealthEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly eventName: string, // e.g., AttendanceHealthChanged
    public readonly correlationId: string,
    public readonly payload: {
      musterId: string;
      siteId: string;
      completionPercentage: number;
      pendingExceptions: number;
    }
  ) {}
}
