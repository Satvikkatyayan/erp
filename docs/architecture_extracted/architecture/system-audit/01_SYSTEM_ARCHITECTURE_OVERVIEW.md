# 01 SYSTEM ARCHITECTURE OVERVIEW

## 1. Overall Architecture
The Enterprise HRMS Platform employs a modular, domain-driven architecture structured around bounded contexts (Employee, Attendance, Payroll, Leave). The architecture strictly isolates reads and writes (CQRS pattern) and mandates inter-module communication exclusively via well-defined Software Development Kits (SDKs).

## 2. High-Level Platform Design
The platform is designed to run as a single deployment (monolith) with strict internal boundaries that mimic a microservices architecture. 
- **Gateway Layer**: Entry point for HTTP requests, guarded by JWT authentication and RBAC/ABAC permission guards.
- **Controller Layer**: Handles HTTP routing, DTO validation, and passes structured data to the Command/Query handlers.
- **Application Layer**: Handlers explicitly route commands and queries to their respective Execution and Query services.
- **Domain/Service Layer**: Execution Services orchestrate transactions and invoke Repositories. Query Services serve as pass-throughs for read operations.
- **Infrastructure Layer**: Prisma serves as the unified ORM, with repositories explicitly encapsulating all direct database interactions.

## 3. Enterprise Principles
1. **Repository Encapsulation**: Services must never inject `PrismaService`. All database access is channeled through custom repositories.
2. **Strict CQRS Segregation**: Complete separation of mutation logic (Commands/ExecutionService) from read logic (Queries/QueryService).
3. **Anti-Corruption SDK Boundary**: Modules communicate with each other exclusively through exported `Platform*SDK` classes. Direct database or internal service access across modules is strictly forbidden.
4. **Centralized Transaction Ownership**: The Execution Service initiates and controls the `$transaction` block. Handlers and Controllers must never open transactions.
5. **Dual Audit Integrity**: Every mutation creates a cryptographically-inspired, tamper-proof history by recording both a timeline event and a full JSON snapshot.

## 4. Layer Responsibilities
- **Controllers**: HTTP boundary, AuthZ verification, DTO validation, Mapper invocation.
- **Handlers**: Command/Query orchestration, event publishing.
- **Execution Services**: Transaction management, domain business logic, mutation orchestration.
- **Query Services**: Read optimization, view model assembly.
- **Repositories**: Direct Prisma interactions, schema scoping, tenant isolation.
- **Mappers**: Translation between internal domain models/responses and external APIs/DTOs.
- **SDKs**: Public anti-corruption layer for cross-module integration.

## 5. Ownership Boundaries
Every module maintains absolute ownership of its bounded context:
- **Employee**: Core identity, profiles, and employment lifecycles.
- **Attendance**: Time tracking, shifts, punches.
- **Payroll**: Financial aggregations, salary orchestration, compliance.
- **Leave**: Absence management, balances, workflows.
- No module may directly query or modify the tables owned by another module.

## 6. Cross-Cutting Concerns
- **Authentication**: JWT-based, handled globally at the Gateway.
- **Authorization**: Granular Permissions (`@RequirePermissions`), handled by the `PermissionGuard`.
- **Tenancy**: `x-tenant-id` header passed explicitly into every Command/Query and cascaded down to the repository layer.
- **Observability**: Execution timings, cache hits/misses, queue depths, and standardized logging.

## 7. Future Architecture Expansion
The current platform lays the groundwork for the upcoming enterprise orchestration milestones:

**Current Platform**
- Employee (Core Identity)
- Leave (Absence Orchestration)
- Payroll (Financial Aggregation)
- Attendance (Time Tracking)
↓
**Future Enterprise Services**
- Enterprise Communication Service (Centralized notifications/emails/SMS)
- Enterprise File Management Service (S3 abstraction, attachments, security)
↓
**Planned Module Integration**
- Recruitment Module (Will orchestrate Employee, Communication, and File Management)
