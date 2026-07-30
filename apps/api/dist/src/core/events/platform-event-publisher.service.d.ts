import { EventBusService } from './event-bus.service';
export declare class PlatformEventPublisher {
    private readonly eventBus;
    constructor(eventBus: EventBusService);
    publish(event: any): void;
    publishAll(events: any[]): void;
}
//# sourceMappingURL=platform-event-publisher.service.d.ts.map