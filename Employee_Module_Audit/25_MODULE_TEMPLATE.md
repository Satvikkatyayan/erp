# 25_MODULE_TEMPLATE

## Table of Contents
1. [Overview](#overview)
2. [Folder Structure Requirement](#folder-structure-requirement)
3. [Required Files per Entity](#required-files-per-entity)
4. [Registration Requirements](#registration-requirements)
5. [Dependency Graph Strictness](#dependency-graph-strictness)

## Overview
Based on the `Employee` bounded context, this is the canonical template that EVERY future module (Leave, Payroll, etc.) MUST adhere to. No deviation is permitted.

## Folder Structure Requirement
Every module MUST contain exactly this directory structure:
```text
modules/<context>/
├── api/
│   ├── dtos/
│   └── mappers/
├── commands/
│   └── handlers/
├── controllers/
├── events/
├── queries/
│   └── handlers/
├── repositories/
├── sdk/
│   └── dtos/
└── services/
```

## Required Files per Entity
For a given aggregate root (e.g., `LeaveRequest`), the module MUST contain:
- **Repository:** `[entity].repository.ts` directly injecting Prisma.
- **Execution Service:** `[context]-execution.service.ts` controlling the `$transaction`.
- **Query Service:** `[context]-query.service.ts`.
- **Commands:** Explicit POJOs for every state mutation (e.g., `ApproveLeaveCommand`).
- **Command Handlers:** One handler per command (e.g., `ApproveLeaveHandler.ts`).
- **Queries:** Explicit POJOs for reads (e.g., `GetLeaveBalanceQuery`).
- **Query Handlers:** One handler per query.
- **Controllers:** Segregated by lifecycle vs read operations.
- **Events:** Domain events for every state change (e.g., `LeaveApprovedEvent`).
- **SDK:** `Platform[Context]SDK.ts`.

## Registration Requirements
Every module MUST expose exactly one Provider to the rest of the application:
```typescript
@Module({
  imports: [],
  controllers: [...allControllers],
  providers: [
    Mapper,
    ...Repositories,
    ExecutionService,
    QueryService,
    ...CommandHandlers,
    ...QueryHandlers,
    PlatformContextSDK
  ],
  exports: [PlatformContextSDK] // <--- THE ONLY EXPORT
})
export class ContextModule {}
```

## Dependency Graph Strictness
- **Controllers** MUST ONLY inject Mappers and Handlers.
- **Handlers** MUST ONLY inject Execution/Query Services and the Event Publisher.
- **Execution Services** MUST ONLY inject Repositories. MUST return Events, not publish them directly.
- **SDK** MUST ONLY inject Query Service.
- **Cross-module interactions** MUST ONLY happen via the injected `PlatformContextSDK`. direct DB access across modules is strictly prohibited.
