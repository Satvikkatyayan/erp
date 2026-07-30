# 21_IMPLEMENTATION_PATTERNS

## Table of Contents
1. [Overview](#overview)
2. [CQRS Pattern](#cqrs-pattern)
3. [Repository Pattern](#repository-pattern)
4. [Unit of Work Pattern](#unit-of-work-pattern)
5. [Anti-Corruption Layer (SDK)](#anti-corruption-layer-sdk)

## Overview
This document extracts the core architectural patterns implemented in the Employee module.

## CQRS Pattern
- **Command Query Responsibility Segregation:** Mutations (Commands) and Reads (Queries) are strictly segregated at every layer.
- **Controllers:** Separated into `EmployeeLifecycleController` (Commands) and `EmployeeQueryController` (Queries).
- **Handlers:** `commands/handlers/` and `queries/handlers/`.
- **Services:** `EmployeeExecutionService` handles all commands. `EmployeeQueryService` handles all queries.
- **Why:** Scales read/write separately, simplifies transaction boundaries.

## Repository Pattern
- **Implementation:** Custom class wrappers around Prisma models (e.g., `EmpEmployeeRepository` wraps `this.prisma.empEmployee`).
- **Why:** Abstracts Prisma logic, ensuring services don't depend directly on the ORM API. Allows global enforcement of multi-tenant `where: { tenantId }` constraints.

## Unit of Work Pattern
- **Implementation:** Achieved via Prisma's `$transaction` API.
- **Execution:** The `EmployeeExecutionService` initiates a transaction and passes the `tx` object down to the repositories.
- **Why:** Guarantees that domain state mutations, timeline entries, and snapshots are all committed atomically.

## Anti-Corruption Layer (SDK)
- **Implementation:** `PlatformEmployeeSDK`.
- **Execution:** Other modules cannot import `EmpEmployeeRepository`. They must import the SDK.
- **Why:** Prevents breaking changes in the Employee schema from cascading into the Payroll or Leave modules. Allows the Employee module to evolve its internal structure freely as long as the SDK contract holds.
