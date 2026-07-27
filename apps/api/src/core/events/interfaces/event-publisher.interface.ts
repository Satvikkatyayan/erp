import { DomainEvent } from './domain-event.interface';

export const EVENT_PUBLISHER = 'EVENT_PUBLISHER';

export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishBatch(events: DomainEvent[]): Promise<void>;
}