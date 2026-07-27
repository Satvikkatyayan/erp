# Expense & Travel Module Architecture

## Overview
The Expense & Travel module is a strictly CQRS-compliant, multi-tenant, and event-driven subsystem of the ERP. It handles the complete lifecycle of corporate expenses, travel requests, budget consumption, and corporate cards.

## Architecture Guidelines
- **Strict CQRS**: Commands mutate state and publish events. Queries read from pre-calculated projections.
- **Controllers**: Controllers are absolutely thin, housing no business logic, and map directly to `ExpenseFacade` or `ExpenseReadFacade`.
- **Decoupled Execution**: Asynchronous processing is handled via a generic `IWorker` and `IJobScheduler` execution framework, agnostic of any underlying queue providers (like BullMQ/RabbitMQ).
- **Universal Context**: Uses `Context` to enforce tenant isolation and correlation tracing across REST layers, Domain boundaries, and Background execution.

## Folder Structure
```
modules/expense/
├── controllers/       # HTTP REST endpoints (Thin)
├── dto/               # API Data Transfer Objects (Requests & Standard Responses)
├── mappers/           # Translation layer between DTOs and internal Commands
├── facades/           # Unified entry point for Write operations
├── engines/           # Core domain logic and rule validation
├── services/          # Pure functions and specific domain operations
├── projections/       # CQRS Read side models and Query facades
├── execution/         # Background worker scheduling, retries, and failure handling
├── workers/           # Single-responsibility background job handlers
├── events/            # Domain Event Bus and Handlers
├── context/           # Local implementations for the global Context standard
└── verification/      # Architectural validation scripts
```

## Event Catalog
- `SUBMIT_CLAIM_COMPLETED`
- `APPROVE_CLAIM_COMPLETED`
- `CREATE_TRAVEL_COMPLETED`
- ... (and all command equivalents)

All events strictly implement `DomainEvent<TPayload>` containing `tenantId`, `correlationId`, `occurredAt`, etc.

## Extension Guidelines
1. **New API Endpoints**: Must go through Request DTOs and Mappers. Command endpoints talk to `ExpenseFacade`. Query endpoints talk to `ExpenseReadFacade`.
2. **New Read Models**: Implement a new Projection Handler and register it with the `ProjectionRegistry`. Do not query the Write database directly.
3. **New Background Tasks**: Implement `IWorker`, register it with the `WorkerRegistry`, and dispatch it via the `ExpenseScheduler` wrapping the payload in a `JobEnvelope`.
4. **New Events**: Fire events via `ExpenseEventBus`. Avoid putting UI or email logic here; write specialized downstream `EventSubscriber` classes.

## Performance and Security Considerations
- **Tenant Isolation**: `tenantId` is strictly mandated via the Context layers. No cross-tenant queries should ever exist.
- **Idempotency**: All event handlers pass through `ProcessedEventStore` to ensure no duplicate side effects on retries or replay.
- **Authorization**: Protected via `@Roles` and `@Permissions` decorators at the Controller boundary.
