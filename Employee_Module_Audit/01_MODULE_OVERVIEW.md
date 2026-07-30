# 01_MODULE_OVERVIEW

## Table of Contents
1. [Purpose of Module](#purpose-of-module)
2. [Responsibilities](#responsibilities)
3. [Module Boundaries](#module-boundaries)
4. [Public Responsibilities](#public-responsibilities)
5. [Internal Responsibilities](#internal-responsibilities)
6. [Ownership](#ownership)
7. [Dependencies](#dependencies)
8. [Architecture Diagrams](#architecture-diagrams)
9. [Lifecycles](#lifecycles)

## Purpose of Module
The Employee bounded context serves as the canonical source of truth for all employee master data, lifecycle events, job assignments, and organizational placement within the HRMS platform. It encapsulates the core employee domain, isolating employee logic from other domains like Leave, Attendance, and Payroll.

## Responsibilities
- Managing the complete employee lifecycle (onboarding, probation, confirmation, promotion, transfer, resignation, termination, exit, and rehire).
- Maintaining job assignments (departments, roles, managers, branches, projects).
- Generating and persisting historical timelines and snapshots of employee states for audit and point-in-time querying.

## Module Boundaries
- **Inbound:** Interacts with external clients (UI/Gateway) exclusively via HTTP REST Controllers. Interacts with other platform modules exclusively through the PlatformEmployeeSDK.
- **Outbound:** Emits domain events (PlatformEventPublisher) for cross-context choreography. Does NOT directly query or mutate state in any other module's database tables.

## Public Responsibilities
- Exposing the PlatformEmployeeSDK to other modules for synchronous cross-domain queries.
- Exposing REST API endpoints for frontend consumption.
- Publishing domain events (e.g., EmployeeCreatedEvent, EmployeeTerminatedEvent) for asynchronous consumption by other modules.

## Internal Responsibilities
- Orchestrating complex transactional workflows (e.g., transferring an employee closes old assignments and creates new ones).
- Managing entity persistence strictly through repositories.
- Enforcing structural separation of commands (mutations) and queries (reads) via CQRS.

## Ownership
### What this module owns:
- Employee entity (EmpEmployee).
- Job Assignments (EmpJobAssignment).
- Employee Lifecycle state transitions.
- Employee Timeline history (EmpEmployeeTimeline).
- Point-in-time Employee Snapshots (EmpEmployeeSnapshot).

### What this module explicitly does NOT own:
- Leave balances, calculations, and requests.
- Attendance records, muster rolls, and timesheets.
- Payroll, salary structures, and deductions.
- Recruitment pipelines and candidate tracking.
- Asset allocations and hardware tracking.

## Dependencies
### External Dependencies
- PrismaService (Global Database Provider)
- PlatformSDK (Global System SDK)
- PlatformEventPublisher (Global Event Bus)
- RequestContextService (Core context propagation)

### Internal Dependencies
Controllers depend on SDKs, Handlers, and Mappers. Handlers depend on Execution Services and Query Services. Execution/Query Services depend on Repositories.

## Architecture Diagrams

### High-level Architecture
`mermaid
graph TD
    Client[HTTP Client] -->|REST| Controllers
    OtherModules[Other Modules] -->|Method Call| SDK[PlatformEmployeeSDK]
    
    Controllers -->|Command/Query| Handlers
    
    subgraph Employee Bounded Context
        SDK --> QueryService[EmployeeQueryService]
        Handlers --> QueryService
        Handlers --> ExecutionService[EmployeeExecutionService]
        
        ExecutionService --> Repositories
        QueryService --> Repositories
    end
    
    Repositories --> Prisma[Prisma ORM]
    ExecutionService -.->|Publish| EventBus[Platform Event Bus]
`

## Lifecycles

### Request Lifecycle
1. HTTP Request reaches Gateway/Controller.
2. Intercepted by JwtAuthGuard (Authentication) and PermissionGuard (Authorization/Scope).
3. Payload is validated and transformed via NestJS pipes into DTOs.
4. Controller maps the request to a Command or Query object.
5. Controller delegates execution to the respective Handler.
6. Handler returns a Result object.
7. Controller transforms the Result into an APIResponseDto via EmployeeMapper and returns HTTP response.

### CQRS Lifecycle
- **Command Path:** Command -> Handler -> Execution Service -> Transaction (Mutation -> Timeline Creation -> Snapshot Creation) -> Event Publication.
- **Query Path:** Query -> Handler -> Query Service -> Repository (Read-only) -> Result.

### Event Lifecycle
1. Execution Service successfully completes a Prisma $transaction.
2. Execution Service returns instantiated Domain Events to the Command Handler.
3. Command Handler iterates over the returned events.
4. Command Handler invokes PlatformEventPublisher.publish(event).
5. External modules asynchronously consume the events via event listeners.
