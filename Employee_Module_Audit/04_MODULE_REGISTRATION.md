# 04_MODULE_REGISTRATION

## Table of Contents
1. [Overview](#overview)
2. [EmployeeModule Details](#employeemodule-details)
3. [Imports](#imports)
4. [Controllers](#controllers)
5. [Providers](#providers)
6. [Exports](#exports)
7. [Registration Order](#registration-order)
8. [Module Bootstrapping](#module-bootstrapping)

## Overview
The `EmployeeModule` is a strictly encapsulated NestJS module responsible for registering all internal providers, controllers, and exporting only the SDK for external communication.

## EmployeeModule Details
- **Filename:** `employee.module.ts`
- **Path:** `apps/api/src/modules/employee/employee.module.ts`
- **Class Name:** `EmployeeModule`
- **Decorator:** `@Module`

## Imports
The `imports` array is empty in the current implementation. 
- **Why:** The module does not depend on other feature modules. It relies on globally injected providers (like `PrismaService`, `PlatformEventPublisher`) which are typically registered in the root `AppModule` or `CoreModule`.

## Controllers
The `controllers` array registers all HTTP endpoints. 
Controllers are registered in this order:
1. `EmployeeLifecycleController`: Handles POST mutations (onboarding, resign, etc.).
2. `EmployeeQueryController`: Handles global GET queries (search, profile, summary).
3. `EmployeeAssignmentController`: Handles GET queries scoped to assignments.
4. `EmployeeOrganizationController`: Handles GET queries scoped to organizational structures (departments, branches, etc.).

## Providers
The `providers` array is extensive and strictly ordered by domain responsibility. It registers all classes that participate in Dependency Injection.

### 1. Mappers
- `EmployeeMapper`: Registered first to provide transformation utilities for the controllers.

### 2. Repositories
Repositories are registered to manage data access.
- `EmpEmployeeRepository`
- `EmpJobAssignmentRepository`
- `EmpEmployeeTimelineRepository`
- `EmpEmployeeSnapshotRepository`
- **Why:** These are injected into the Execution and Query Services.

### 3. Execution Services
- `EmployeeExecutionService`
- **Why:** Orchestrates transactions. Must be registered to be injected into Command Handlers.

### 4. Command Handlers
Every command handler is explicitly registered.
- `OnboardEmployeeHandler`
- `JoinEmployeeHandler`
- `BeginProbationHandler`
- `ConfirmEmployeeHandler`
- `TransferEmployeeHandler`
- `PromoteEmployeeHandler`
- `ResignEmployeeHandler`
- `TerminateEmployeeHandler`
- `ExitEmployeeHandler`
- `RehireEmployeeHandler`
- **Why:** Controllers inject these directly. Note: The module does not use `@nestjs/cqrs` CommandBus; controllers inject handlers explicitly.

### 5. Query Services & Handlers
- `EmployeeQueryService`: Orchestrates read logic across repositories.
- `GetEmployeeProfileHandler`
- `GetEmployeeSummaryHandler`
- `GetCurrentAssignmentHandler`
- `GetAssignmentHistoryHandler`
- `GetEmployeeTimelineHandler`
- `SearchEmployeesHandler`
- `GetEmployeesByManagerHandler`
- `GetEmployeesByDepartmentHandler`
- `GetEmployeesByProjectHandler`
- `GetEmployeesByOrganizationHandler`
- `GetEmployeesByBranchHandler`
- `GetEmploymentStatusHandler`
- `GetExitInformationHandler`
- **Why:** Controllers inject these directly to handle incoming GET requests.

### 6. SDK
- `PlatformEmployeeSDK`
- **Why:** The SDK wraps `EmployeeQueryService` and provides strict typings for external modules.

## Exports
The `exports` array exposes providers to other modules that import `EmployeeModule`.
- **Exported:** `PlatformEmployeeSDK`
- **Why:** This enforces the strict architectural rule that no module can access Employee Repositories or Services directly. External communication MUST flow through the SDK.

## Registration Order
The registration is static and follows a logical grouping. No dynamic modules, factory providers, aliases, or custom tokens (`{ provide: 'TOKEN', useClass: ... }`) are used. All providers use implicit class-based injection.

## Module Bootstrapping
There are no lifecycle hooks (like `onModuleInit`) implemented in the `EmployeeModule`. It serves purely as an IoC container configuration.
