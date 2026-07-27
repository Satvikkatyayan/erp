import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class AttendanceLifecycleEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly eventName: string, // e.g. 'AttendanceSubmitted', 'AttendanceValidated'
    public readonly correlationId: string,
    public readonly payload: {
      musterId: string;
      actorId: string;
      fromState: string;
      toState: string;
      reason?: string;
    }
  ) {}
}
