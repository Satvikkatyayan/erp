export const EventCatalog = {
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
} as const;

export type EventType = keyof typeof EventCatalog;
