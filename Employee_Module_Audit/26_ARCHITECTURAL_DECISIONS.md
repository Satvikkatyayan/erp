# 26_ARCHITECTURAL_DECISIONS

## Table of Contents
1. [CQRS Implementation](#cqrs-implementation)
2. [Separation of Repositories](#separation-of-repositories)
3. [SDK Exclusivity](#sdk-exclusivity)
4. [Dual Audit Patterns (Timelines & Snapshots)](#dual-audit-patterns-timelines--snapshots)

---

## CQRS Implementation
- **Decision:** Strict segregation of Commands (mutations) and Queries (reads) without using a third-party event bus like `@nestjs/cqrs`.
- **Reasoning from Code:** Controllers manually inject explicit handler classes (`OnboardEmployeeHandler`, `GetEmployeeProfileHandler`) instead of pushing a generic object to a generic `CommandBus`. This enforces strong static typing and clear dependency boundaries visible at compile-time within the Module's `providers` array.

## Separation of Repositories
- **Decision:** One repository per Prisma model (`EmpEmployeeRepository`, `EmpJobAssignmentRepository`), rather than one giant `EmployeeRepository` wrapping everything.
- **Reasoning from Code:** The `EmployeeExecutionService` and `EmployeeQueryService` inject multiple repositories and orchestrate them together. This proves the repositories are intended to be narrow, single-entity wrappers that do not orchestrate business logic themselves.

## SDK Exclusivity
- **Decision:** `PlatformEmployeeSDK` is the ONLY export in the module.
- **Reasoning from Code:** In `employee.module.ts`, the `exports` array contains `[PlatformEmployeeSDK]` and absolutely nothing else. By NestJS constraints, external modules cannot inject `EmployeeExecutionService` or `EmpEmployeeRepository` even if they wanted to, enforcing the anti-corruption layer.

## Dual Audit Patterns (Timelines & Snapshots)
- **Decision:** Every mutation creates both a timeline entry and a snapshot entry.
- **Reasoning from Code:** In `EmployeeExecutionService`, every command method calls both `this.timelineRepo.createTimelineEntry` and `this.snapshotRepo.createSnapshot` within the same Prisma `$transaction`. This proves the architecture requires both narrative history (Timeline) and data reconstruction (Snapshot) for complete auditability.
