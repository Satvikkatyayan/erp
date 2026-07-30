# 08 IMPLEMENTATION PATTERN AUDIT

## 1. Controllers
- **Pattern**: Thin, delegating routers.
- **Standard**: Strip HTTP context, validate payload via DTOs, map to a Command/Query object, invoke the Handler, and map the domain result back to an API response using the Module's Mapper.
- **Rule**: No business logic, no `PrismaService`, no transactions.

## 2. Commands & Queries
- **Pattern**: Immutable data structures representing intent.
- **Standard**: Distinct classes (e.g., `ApplyLeaveCommand`) holding the `tenantId` and the payload. Separates "what to do" from "how to do it".

## 3. Handlers
- **Pattern**: Orchestrators for a specific use case.
- **Standard**: Inject the required Execution/Query Service. Await the service execution. If a mutation, iterate over the returned `ExecutionResult.events` and publish them via `PlatformEventPublisher`.
- **Rule**: One Handler per Command/Query.

## 4. Execution Services
- **Pattern**: Transactional Domain Logic.
- **Standard**: Defines the `prisma.$transaction` block. Orchestrates multiple repositories, enforcing the Dual Audit requirement (Timeline + Snapshot).
- **Rule**: Only Execution Services may open transactions.

## 5. Query Services
- **Pattern**: Read-optimized data fetching.
- **Standard**: Passes through to Repositories to assemble complex view models. Never modifies state.

## 6. Repositories
- **Pattern**: Data Access Abstraction.
- **Standard**: The only classes permitted to inject `PrismaService`. All methods must accept a `tenantId` and enforce it in the `where` clause. Mutation methods must accept an optional Prisma transaction client (`tx`).

## 7. SDKs
- **Pattern**: Anti-Corruption Layer.
- **Standard**: Exposed as a NestJS provider. Injects the module's QueryService. Returns strictly typed DTOs, stripping internal database fields.

## 8. Validators & DTOs
- **Pattern**: Edge Defense.
- **Standard**: Implemented using `class-validator` and `class-transformer` decorators on DTO classes. Ensures bad data never reaches the Handlers.

## 9. Mappers
- **Pattern**: Translation Layer.
- **Standard**: Converts Service outputs into standardized API responses using `this.mapper.success(...)`.

## 10. Dependency Injection
- **Pattern**: Scoped Registration.
- **Standard**: Every Handler, Service, Repository, and Mapper is registered precisely once in the `[Module].module.ts` providers array.

## 11. Audit (Timeline & Snapshot)
- **Pattern**: Cryptographic-style logging.
- **Standard**: Every execution completes by creating a Timeline entry (who, what, when) and a Snapshot entry (full JSON state serialization at that exact millisecond).
