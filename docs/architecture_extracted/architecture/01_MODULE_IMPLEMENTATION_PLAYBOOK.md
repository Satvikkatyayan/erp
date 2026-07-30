# 01_MODULE_IMPLEMENTATION_PLAYBOOK

This playbook defines the mandatory engineering workflow used to implement every bounded context within the ERP platform. It is the official execution manual, derived directly from the Enterprise Architecture Standard. 

**Every future module MUST follow this exact 10-phase workflow.**

---

## Phase 1: Domain Definition
**Objective:** Define the core domain structures before writing any operational code.
1. **Entities:** Define the core Prisma schema for the aggregate root (e.g., `LveLeaveRequest`). Map it with strict `@map` boundaries.
2. **Relationships:** Define all auxiliary tables and foreign keys (e.g., `LveLeaveBalance`).
3. **Events:** Define the domain events for all state transitions (e.g., `LeaveApprovedEvent`). Implement the `DomainEvent` interface.
4. **Audit Strategy:** Define the `<Entity>Timeline` and `<Entity>Snapshot` schemas.

---

## Phase 2: API Contract
**Objective:** Establish the strict input and output boundaries.
1. **DTOs:** Create Request and Query DTOs in `api/dtos/`.
2. **Validation:** Apply `class-validator` decorators to all incoming payload structures.
3. **Responses:** Utilize the global `APIResponseDto<T>` for all endpoints.
4. **Mappers:** Create a centralized `<Context>Mapper` to transform internal results to the `APIResponseDto`.

---

## Phase 3: Intent Definition
**Objective:** Decouple HTTP from execution logic by establishing clear intent objects.
1. **Commands:** Create POJOs for every state mutation inside `commands/`. Include `tenantId`.
2. **Queries:** Create POJOs for every read request inside `queries/`. Include `tenantId`.
3. **Handlers:** Stub out the Handler classes inside `commands/handlers/` and `queries/handlers/`.

---

## Phase 4: Persistence
**Objective:** Abstract Prisma access via the Repository pattern.
1. **Repositories:** Create one repository class per Prisma model (Core entity, auxiliary entities, Timeline, Snapshot).
2. **Entity Mapping:** Wrap Prisma delegates (e.g., `this.prisma.lveLeaveRequest`).
3. **Tenant Isolation:** Enforce `where: { tenantId }` in every single `findFirst`, `findMany`, and `count` method.
4. **Transactions:** Implement the optional `tx` parameter in all mutation methods to allow upstream Unit of Work participation.

---

## Phase 5: Business Logic (Execution)
**Objective:** Implement state transitions and transaction boundaries.
1. **Execution Service:** Create `<Context>ExecutionService` and inject all Repositories.
2. **Business Rules:** Implement validation logic (e.g., cannot approve a cancelled leave).
3. **Transactions:** Wrap every command execution inside a `this.prisma.$transaction` block.
4. **Timeline:** Call `timelineRepo.createTimelineEntry` within the transaction.
5. **Snapshots:** Call `snapshotRepo.createSnapshot` within the transaction.
6. **ExecutionResult:** Return the mutated data alongside instantiated Domain Events. Do NOT publish events directly.

---

## Phase 6: Business Logic (Queries)
**Objective:** Centralize complex read orchestration.
1. **Query Service:** Create `<Context>QueryService` and inject required Repositories.
2. **Read Models:** Format data for internal consumption.
3. **Repository Coordination:** Combine calls from multiple repositories if a complex read requires it.

---

## Phase 7: Anti-Corruption (SDK)
**Objective:** Expose data to external bounded contexts.
1. **SDK:** Create `Platform<Context>SDK`.
2. **Read APIs:** Inject `<Context>QueryService` and expose read-only methods.
3. **Cross Module Access:** Do not expose commands. Do not expose repositories. Provide explicit types for external modules.

---

## Phase 8: Orchestration (Handlers)
**Objective:** Connect Intents to Business Logic.
1. **Command Handlers:** Inject `<Context>ExecutionService` and `PlatformEventPublisher`. Invoke the service, iterate the `ExecutionResult.events`, and publish them.
2. **Query Handlers:** Inject `<Context>QueryService` and invoke the respective read method.

---

## Phase 9: Transport (Controllers)
**Objective:** Handle HTTP routing and guard enforcement.
1. **Controllers:** Segregate into `*LifecycleController` (Writes) and `*QueryController` (Reads).
2. **Routes:** Define REST paths and map payload DTOs.
3. **Validation:** Ensure Pipes trigger DTO validation.
4. **Permissions:** Apply `@UseGuards(JwtAuthGuard, PermissionGuard)` and specific `@RequirePermissions` to every endpoint.
5. **Execution:** Inject Handlers explicitly, invoke them, map the response via the Mapper, and return to the client.

---

## Phase 10: Module Assembly & Review
**Objective:** Wire IoC and validate architectural integrity.
1. **Module Registration:** Register Mappers, Repositories, Services, Handlers, Controllers, and the SDK inside `<Context>Module`.
2. **Exports:** Add strictly the SDK to the `exports` array.
3. **Architecture Review:** The module author MUST run every checklist found in `00_ENTERPRISE_MODULE_ARCHITECTURE_STANDARD.md`. No implementation may begin integration or testing until all checks pass.
