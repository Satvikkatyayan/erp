import { EventPublisher, DomainEvent, EventSubscriber } from '../../../core/events/event.contracts';
import { EventRegistry } from '../../../core/registry/event.registry';
import { ProcessedEventStore } from './idempotency/processed-event.store';
export declare class ExpenseEventBus implements EventPublisher {
    private readonly registry;
    private readonly idempotencyStore;
    constructor(registry: EventRegistry, idempotencyStore: ProcessedEventStore);
    publish(event: DomainEvent<any>): Promise<void>;
    publishBatch(events: DomainEvent<any>[]): Promise<void>;
    subscribe(eventType: string, handler: EventSubscriber): void;
    unsubscribe(eventType: string, handler: EventSubscriber): void;
}
//# sourceMappingURL=expense-event.bus.d.ts.map