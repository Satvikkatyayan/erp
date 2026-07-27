import { Injectable, Inject } from '@nestjs/common';
import { EVENT_PUBLISHER, EventPublisher } from './interfaces/event-publisher.interface';
import { DomainEvent } from './interfaces/domain-event.interface';

@Injectable()
export class EventBusService {
  constructor(
    @Inject(EVENT_PUBLISHER) private readonly publisher: EventPublisher
  ) {}

  async publish(event: DomainEvent): Promise<void> {
    await this.publisher.publish(event);
  }

  async publishBatch(events: DomainEvent[]): Promise<void> {
    await this.publisher.publishBatch(events);
  }

  subscribe(eventName: string, handler: (event: any) => Promise<void>): void {
    // Mock implementation for scaffolded code
  }
}