import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { v4 as uuidv4 } from 'uuid';

export class AttendanceReviewEvent implements DomainEvent {
  public readonly eventId: string = uuidv4();
  public readonly version: number = 1;
  public readonly timestamp: Date = new Date();

  constructor(
    public readonly eventName: string,
    public readonly correlationId: string,
    public readonly payload: {
      musterId: string;
      reviewerId?: string;
      role?: string;
      decision?: string;
      remarks?: string;
    }
  ) {}
}
