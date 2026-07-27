import { DomainEvent } from './domain-event.interface';
export interface EventHandler {
    handle(event: DomainEvent): Promise<void>;
}
//# sourceMappingURL=event-handler.interface.d.ts.map