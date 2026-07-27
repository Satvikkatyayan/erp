import { AbstractRegistry } from './abstract.registry';
import { EventSubscriber } from '../events/event.contracts';
export declare class EventRegistry extends AbstractRegistry<EventSubscriber> {
    protected supportsMultipleItemsPerKey(): boolean;
    getHandlers(eventType: string): EventSubscriber[];
}
//# sourceMappingURL=event.registry.d.ts.map