export declare const EventCatalog: {
    readonly ExpenseSubmitted: {
        readonly aggregate: "ExpenseClaim";
        readonly version: 1;
    };
    readonly ExpenseApproved: {
        readonly aggregate: "ExpenseClaim";
        readonly version: 1;
    };
    readonly ExpenseRejected: {
        readonly aggregate: "ExpenseClaim";
        readonly version: 1;
    };
    readonly ExpensePaid: {
        readonly aggregate: "ExpenseClaim";
        readonly version: 1;
    };
    readonly TravelCreated: {
        readonly aggregate: "TravelRequest";
        readonly version: 1;
    };
    readonly TravelApproved: {
        readonly aggregate: "TravelRequest";
        readonly version: 1;
    };
    readonly TravelCompleted: {
        readonly aggregate: "TravelRequest";
        readonly version: 1;
    };
    readonly CorporateCardImported: {
        readonly aggregate: "CorporateCard";
        readonly version: 1;
    };
    readonly AdvanceSettled: {
        readonly aggregate: "Advance";
        readonly version: 1;
    };
};
export type EventType = keyof typeof EventCatalog;
//# sourceMappingURL=event.catalog.d.ts.map