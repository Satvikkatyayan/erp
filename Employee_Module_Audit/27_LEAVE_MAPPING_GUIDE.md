# 27_LEAVE_MAPPING_GUIDE

## Table of Contents
1. [Overview](#overview)
2. [Architecture Component Mapping](#architecture-component-mapping)
3. [Database Model Mapping](#database-model-mapping)
4. [State Lifecycle Mapping](#state-lifecycle-mapping)

## Overview
This document serves as the direct Rosetta Stone between the canonical Employee implementation and the target Leave implementation (Phase 01).

## Architecture Component Mapping

| Employee Component (Reference) | Leave Component (Target) | Notes |
| :--- | :--- | :--- |
| `EmployeeModule` | `LeaveModule` | Root container. |
| `EmployeeLifecycleController` | `LeaveLifecycleController` | Handles mutations (Apply, Approve, Reject, Cancel). |
| `EmployeeQueryController` | `LeaveQueryController` | Handles reads (Get Request, Search Requests, Balances). |
| `EmployeeExecutionService` | `LeaveExecutionService` | Owns Prisma `$transaction` for all Leave commands. |
| `EmployeeQueryService` | `LeaveQueryService` | Owns read orchestration. |
| `EmpEmployeeRepository` | `LveLeaveRequestRepository` | Core entity repository. |
| `EmpEmployeeTimelineRepository` | `LveLeaveTimelineRepository` | History repository. |
| `EmpEmployeeSnapshotRepository` | `LveLeaveSnapshotRepository` | Snapshot repository. |
| `EmpJobAssignmentRepository` | `LveLeaveBalanceRepository` | Auxiliary domain entity. |
| `PlatformEmployeeSDK` | `PlatformLeaveSDK` | The only export from `LeaveModule`. |

### Command & Query Mapping
| Employee | Leave Equivalent |
| :--- | :--- |
| `OnboardEmployeeCommand` | `ApplyLeaveCommand` |
| `ConfirmEmployeeCommand` | `ApproveLeaveCommand` |
| `ResignEmployeeCommand` | `RejectLeaveCommand` |
| `ExitEmployeeCommand` | `CancelLeaveCommand` |
| `GetEmployeeProfileQuery` | `GetLeaveRequestQuery` |
| `SearchEmployeesQuery` | `SearchLeaveRequestsQuery` |

### Event Mapping
| Employee Event | Leave Equivalent |
| :--- | :--- |
| `EmployeeCreatedEvent` | `LeaveAppliedEvent` |
| `EmployeeConfirmedEvent` | `LeaveApprovedEvent` |
| `EmployeeResignedEvent` | `LeaveRejectedEvent` |
| `EmployeeExitedEvent` | `LeaveCancelledEvent` |
| `EmployeeTimelineCreatedEvent`| `LeaveTimelineCreatedEvent` |
| `EmployeeSnapshotCreatedEvent`| `LeaveSnapshotCreatedEvent` |

## Database Model Mapping

| Employee Prisma Model | Leave Prisma Model |
| :--- | :--- |
| `EmpEmployee` | `LveLeaveRequest` |
| `EmpEmployeeTimeline` | `LveLeaveTimeline` |
| `EmpEmployeeSnapshot` | `LveLeaveSnapshot` |
| `EmpJobAssignment` | `LveLeaveBalance` |

## State Lifecycle Mapping
*Employee Lifecycle is complex (DRAFT -> JOINED -> PROBATION -> CONFIRMED -> NOTICE -> EXITED).*
*Leave Lifecycle is simpler.*

| Employee State | Leave State Equivalent |
| :--- | :--- |
| `DRAFT` | `DRAFT` (If user saves without submitting) |
| `JOINED` | `PENDING_APPROVAL` (Submitted for review) |
| `CONFIRMED` | `APPROVED` |
| `EXITED` | `CANCELLED` (Withdrawn by user) |
| `TERMINATED` | `REJECTED` (Denied by manager) |
| `PROBATION` | No equivalent required. |
