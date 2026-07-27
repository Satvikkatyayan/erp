import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';
export declare class CorporateCardImportedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
export declare class AdvanceSettledHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
//# sourceMappingURL=misc.handlers.d.ts.map