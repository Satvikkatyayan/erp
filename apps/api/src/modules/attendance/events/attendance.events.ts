import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class DailyMusterCreatedEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly eventName: string = 'DailyMusterCreated';
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly correlationId: string,
    public readonly payload: {
      musterId: string;
      siteId: string;
      date: Date;
      createdBy: string;
    }
  ) {}
}

export class AttendanceSnapshotCreatedEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly eventName: string = 'AttendanceSnapshotCreated';
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly correlationId: string,
    public readonly payload: {
      snapshotId: string;
      musterId: string;
      siteId: string;
      employeeCount: number;
    }
  ) {}
}
