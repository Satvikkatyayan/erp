import { EventPublisher } from './interfaces/event-publisher.interface';
import { DomainEvent } from './interfaces/domain-event.interface';
export declare class EventBusService {
    private readonly publisher;
    constructor(publisher: EventPublisher);
    publish(event: DomainEvent): Promise<void>;
    publishBatch(events: DomainEvent[]): Promise<void>;
    subscribe(eventName: string, handler: (event: any) => Promise<void>): void;
}
//# sourceMappingURL=event-bus.service.d.ts.map