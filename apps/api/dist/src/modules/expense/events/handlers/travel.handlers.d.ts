import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';
export declare class TravelApprovedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
export declare class TravelCompletedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
//# sourceMappingURL=travel.handlers.d.ts.map