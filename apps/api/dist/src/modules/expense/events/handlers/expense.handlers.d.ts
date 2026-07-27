import { EventSubscriber, DomainEvent } from '../../../../core/events/event.contracts';
export declare class ExpenseSubmittedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
export declare class ExpenseApprovedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
export declare class ExpenseRejectedHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
export declare class ExpensePaidHandler implements EventSubscriber {
    handle(event: DomainEvent<any>): Promise<void>;
}
//# sourceMappingURL=expense.handlers.d.ts.map