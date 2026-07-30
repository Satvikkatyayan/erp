# 13 ARCHITECTURAL FREEZE BASELINE

## 1. Context
As per Enterprise Rule #10, the foundational architecture established across the Employee, Attendance, Payroll, and Leave modules is now strictly frozen. No new foundational architectural patterns may be introduced. All future modules (Recruitment, Communication, File Management) MUST build upon this established baseline.

## 2. Frozen Components

### 2.1 SDK Contracts
- All inter-module communication is exclusively routed through exported `Platform[Module]SDK` providers.
- SDK signatures are locked. Modifying an existing SDK method signature requires Principal Architect approval and cross-module refactoring.
- SDKs only return strictly validated DTOs, never raw Prisma entities.

### 2.2 Module Boundaries
- Repositories, Services, Handlers, and Prisma transactions are completely private to their host module.
- Cross-database `JOIN` operations across module boundaries are forbidden. Use IDs and resolve via SDKs.

### 2.3 Folder Conventions
Every module MUST possess the following exact internal directory tree:
`api/` (dtos, mappers), `commands/` (handlers, models), `queries/` (handlers, models), `controllers/`, `services/`, `repositories/`, `sdk/`.

### 2.4 Dependency Rules
- Controllers depend ONLY on Handlers, Mappers, and DTOs.
- Handlers depend ONLY on Execution/Query Services and the global Event Publisher.
- Execution/Query Services depend ONLY on Repositories and external SDKs.
- Repositories depend ONLY on `PrismaService`.

### 2.5 Naming Conventions
- Controllers: `[Domain]LifecycleController`, `[Domain]QueryController`.
- Commands: `[Action][Domain]Command`.
- Handlers: `[Action][Domain]Handler`.
- Services: `[Domain]ExecutionService`, `[Domain]QueryService`.
- Repositories: `[Domain]Repository`.

### 2.6 Core Architectural Principles
- **CQRS**: Commands and Queries are structurally isolated.
- **Repository Encapsulation**: Services never touch Prisma directly.
- **Unit of Work**: Transactions are scoped and owned completely by the Execution Service.
- **Dual Audit**: Every mutation logs to a Timeline and a full-state Snapshot table.
