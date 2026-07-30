# 14_SDK

## Table of Contents
1. [Overview](#overview)
2. [PlatformEmployeeSDK Details](#platformemployeesdk-details)
3. [Public Methods](#public-methods)
4. [Internal Methods](#internal-methods)
5. [Dependencies](#dependencies)
6. [Consumers](#consumers)

## Overview
The `PlatformEmployeeSDK` is the ONLY class exported by the `EmployeeModule`. It serves as an Anti-Corruption Layer (ACL) between the Employee context and all other bounded contexts (e.g., Leave, Payroll, Attendance).

## PlatformEmployeeSDK Details
- **Registration Name:** `PlatformEmployeeSDK`
- **File:** `apps/api/src/modules/employee/sdk/platform-employee.sdk.ts`
- **Registration:** In `providers` and `exports` arrays of `EmployeeModule`.
- **Import Locations:** Modules needing employee data import `EmployeeModule` and inject `PlatformEmployeeSDK`.
- **Constructor Dependencies:** `queryService: EmployeeQueryService`
- **Call Graph:** External Module Service -> `PlatformEmployeeSDK` -> `EmployeeQueryService` -> `EmpEmployeeRepository` (and others).

## Public Methods
Every method exposed by the SDK translates database entity shapes into strict SDK DTOs (e.g., `EmployeeProfileDto`, `EmployeeSummaryDto`).

### Commands Exposed
**None.** 
*Architectural Decision:* The SDK strictly exposes read-only queries. Inter-module mutations are prohibited. Bounded contexts must emit events (e.g., `LeaveApprovedEvent`) and rely on the Employee module to consume them if employee state changes are required.

### Queries Exposed

#### `getEmployeeProfile(tenantId, employeeId)`
- **Return Type:** `Promise<EmployeeProfileDto | null>`
- **Delegates to:** `queryService.findEmployeeById`

#### `getEmployeeSummary(tenantId, employeeId)`
- **Return Type:** `Promise<EmployeeSummaryDto | null>`
- **Delegates to:** `queryService.findEmployeeSummary`

#### `getEmploymentStatus(tenantId, employeeId)`
- **Return Type:** `Promise<string | null>`

#### `isEmployeeActive(tenantId, employeeId)`
- **Return Type:** `Promise<boolean>`

#### `exists(tenantId, employeeId)`
- **Return Type:** `Promise<boolean>`

#### `getCurrentAssignment(tenantId, employeeId)`
- **Return Type:** `Promise<JobAssignmentDto | null>`

#### `getCurrentDepartment`, `getCurrentDesignation`, `getCurrentManager`, `getCurrentProject`
- **Return Type:** `Promise<string | null>`

#### `getAssignmentHistory(tenantId, employeeId)`
- **Return Type:** `Promise<JobAssignmentDto[]>`

#### `getTimeline(tenantId, employeeId)`
- **Return Type:** `Promise<TimelineEntryDto[]>`

#### `searchEmployees(tenantId, filters)`
- **Return Type:** `Promise<EmployeeSummaryDto[]>`

#### `getEmployeesByManager`, `getEmployeesByDepartment`, `getEmployeesByProject`, `getEmployeesByOrganization`, `getEmployeesByBranch`
- **Return Type:** `Promise<EmployeeSummaryDto[]>`

#### `getJoiningDate`, `getConfirmationStatus`, `isOnProbation`, `hasCompletedProbation`, `isExited`, `getExitInformation`
- **Return Type:** Primitives or metadata extracted from timeline.

#### Validation Helpers
- `validateEmployee(tenantId, employeeId)`: Throws error if missing.
- `validateActiveEmployee(tenantId, employeeId)`: Throws error if inactive.

#### `getTeamScopeIds(ctx, employeeId, allowIndirect, maxDepth)`
- **Return Type:** `Promise<string[]>`
- **Notes:** Currently a stub.

## Internal Methods
None. Every method in the SDK is public.

## Dependencies
- Only depends on `EmployeeQueryService`.
- NEVER injects repositories directly.
- NEVER depends on Execution Services.

## Consumers
- Any external module (Leave, Attendance, Payroll) injecting `PlatformEmployeeSDK`.
