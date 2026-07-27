"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventCatalog = void 0;
exports.EventCatalog = {
    ExpenseSubmitted: {
        aggregate: 'ExpenseClaim',
        version: 1,
    },
    ExpenseApproved: {
        aggregate: 'ExpenseClaim',
        version: 1,
    },
    ExpenseRejected: {
        aggregate: 'ExpenseClaim',
        version: 1,
    },
    ExpensePaid: {
        aggregate: 'ExpenseClaim',
        version: 1,
    },
    TravelCreated: {
        aggregate: 'TravelRequest',
        version: 1,
    },
    TravelApproved: {
        aggregate: 'TravelRequest',
        version: 1,
    },
    TravelCompleted: {
        aggregate: 'TravelRequest',
        version: 1,
    },
    CorporateCardImported: {
        aggregate: 'CorporateCard',
        version: 1,
    },
    AdvanceSettled: {
        aggregate: 'Advance',
        version: 1,
    }
};
//# sourceMappingURL=event.catalog.js.map