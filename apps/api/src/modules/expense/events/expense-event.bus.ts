import { Injectable } from '@nestjs/common';
import { EventPublisher, DomainEvent, EventSubscriber } from '../../../core/events/event.contracts';
import { EventRegistry } from '../../../core/registry/event.registry';
import { ProcessedEventStore } from './idempotency/processed-event.store';

@Injectable()
export class ExpenseEventBus implements EventPublisher {
  constructor(
    private readonly registry: EventRegistry,
    private readonly idempotencyStore: ProcessedEventStore,
  ) {}

  async publish(event: DomainEvent<any>): Promise<void> {
    const handlers = this.registry.getHandlers(event.eventType);
    
    for (const handler of handlers) {
      const handlerId = handler.constructor.name;
      const isProcessed = await this.idempotencyStore.isProcessed(event.eventId, handlerId);
      
      if (!isProcessed) {
        await handler.handle(event);
        await this.idempotencyStore.markAsProcessed(event.eventId, handlerId);
      }
    }
  }

  async publishBatch(events: DomainEvent<any>[]): Promise<void> {
    for (const event of events) {
      await this.publish(event);
    }
  }

  subscribe(eventType: string, handler: EventSubscriber): void {
    this.registry.register(eventType, handler);
  }

  unsubscribe(eventType: string, handler: EventSubscriber): void {
    // Unsubscribe logic placeholder
  }
}
