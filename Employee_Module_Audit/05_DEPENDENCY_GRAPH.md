# 05_DEPENDENCY_GRAPH

## Table of Contents
1. [Overview](#overview)
2. [Macro Dependency Flow](#macro-dependency-flow)
3. [Command Flow Graph](#command-flow-graph)
4. [Query Flow Graph](#query-flow-graph)
5. [Cross-Module Interactions](#cross-module-interactions)
6. [References](#references)

## Overview
This document details the exact dependency direction and execution flow within the `Employee` bounded context. The architecture enforces a strict top-to-bottom dependency graph where higher-level constructs (Controllers) depend on lower-level constructs (Handlers, SDKs), which depend on Services, and finally Repositories.

## Macro Dependency Flow
The macro flow dictates the allowed directions of imports and invocations.

```mermaid
graph TD
    Client[HTTP Client] -->|HTTP REST| Controllers
    OtherModules[External Modules] -->|TypeScript| SDK[PlatformEmployeeSDK]
    
    Controllers -->|Instantiates| Commands/Queries
    Controllers -->|Invokes| Command/QueryHandlers
    
    SDK -->|Invokes| QueryService[EmployeeQueryService]
    
    Command/QueryHandlers -->|Invokes| ExecutionService[EmployeeExecutionService]
    Command/QueryHandlers -->|Invokes| QueryService[EmployeeQueryService]
    Command/QueryHandlers -->|Publishes| EventPublisher[PlatformEventPublisher]
    
    ExecutionService -->|Injects| Repositories
    QueryService -->|Injects| Repositories
    
    Repositories -->|Injects| Prisma[PrismaService]
    
    EventPublisher -.->|Asynchronous| EventListeners[Other Bounded Contexts]
```

## Command Flow Graph
The command flow represents mutations (writes) to the system state.

```mermaid
graph TD
    A[EmployeeLifecycleController] --> B[OnboardEmployeeCommand]
    A --> C[OnboardEmployeeHandler]
    C --> D[EmployeeExecutionService]
    C --> E[PlatformEventPublisher]
    D --> F[EmpEmployeeRepository]
    D --> G[EmpJobAssignmentRepository]
    D --> H[EmpEmployeeTimelineRepository]
    D --> I[EmpEmployeeSnapshotRepository]
    F --> J[PrismaService]
    G --> J
    H --> J
    I --> J
    E -.-> K[EmployeeCreatedEvent]
    E -.-> L[EmployeeTimelineCreatedEvent]
    E -.-> M[EmployeeSnapshotCreatedEvent]
```
*(This exact flow applies symmetrically to all other commands: Join, Confirm, Promote, Transfer, Resign, Terminate, Exit, Rehire, BeginProbation).*

## Query Flow Graph
The query flow represents reads from the system state without side effects.

```mermaid
graph TD
    A[EmployeeQueryController] --> B[SearchEmployeesQuery]
    A --> C[SearchEmployeesHandler]
    
    D[EmployeeAssignmentController] --> E[GetCurrentAssignmentQuery]
    D --> F[GetCurrentAssignmentHandler]
    
    G[EmployeeOrganizationController] --> H[GetEmployeesByManagerQuery]
    G --> I[GetEmployeesByManagerHandler]
    
    C --> J[EmployeeQueryService]
    F --> J
    I --> J
    
    J --> K[EmpEmployeeRepository]
    J --> L[EmpJobAssignmentRepository]
    J --> M[EmpEmployeeTimelineRepository]
    
    K --> N[PrismaService]
    L --> N
    M --> N
```

## Cross-Module Interactions
The Employee module does not import dependencies from other domain modules.
It exposes the `PlatformEmployeeSDK`.

```mermaid
graph LR
    LeaveModule --> PlatformEmployeeSDK
    PayrollModule --> PlatformEmployeeSDK
    AttendanceModule --> PlatformEmployeeSDK
    PlatformEmployeeSDK --> EmployeeQueryService
```

## References
- See [04_MODULE_REGISTRATION.md](04_MODULE_REGISTRATION.md) for actual IoC registrations.
- See [12_EXECUTION_SERVICES.md](12_EXECUTION_SERVICES.md) for transactional flow logic.
- See [14_SDK.md](14_SDK.md) for SDK exposure.
