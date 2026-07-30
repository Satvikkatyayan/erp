# 01_MODULE

## Table of Contents
1. [Purpose](#1-purpose)
2. [Business Scope](#2-business-scope)
3. [Module Ownership](#3-module-ownership)
4. [Module Dependencies](#4-module-dependencies)
5. [Module Boundaries](#5-module-boundaries)
6. [Future Components](#6-future-components)
7. [Compliance](#7-compliance)

---

## 1. Purpose
- **Bounded Context:** Leave Management.
- **Responsibilities:** Managing the complete lifecycle of employee leave requests, leave approvals, leave policies, and accrued leave balances.
- **Goals:** Provide a unified domain for employees to request time off, managers to approve/reject requests, and HR to define global or tenant-specific leave accrual policies.
- **Non-Goals:** It is not responsible for generating timesheets, processing salary deductions for unpaid leave, or managing employee macro-statuses (e.g., terminating an employee who absconds).

---

## 2. Business Scope
The Leave module is strictly responsible for:
- Evaluating leave eligibility based on defined policies.
- Tracking accrued, utilized, and remaining leave balances for every employee.
- Providing workflows for leave application, cancellation, manager approval, and manager rejection.
- Maintaining a historical timeline of all leave-related actions for auditing.
- Generating point-in-time snapshots of leave request states upon mutation.

---

## 3. Module Ownership
The Leave module explicitly owns the following domain concepts and data models:
- **Leave Requests:** The core transactional record of an employee asking for time off.
- **Leave Balances:** The ledger tracking available quotas (e.g., Annual, Sick, Maternity).
- **Leave Policies:** The rules engine defining accrual rates, carryover limits, and eligibility.
- **Leave Approvals:** The state transitions representing managerial consent.
- **Leave History (Timeline):** The append-only narrative of actions taken on a leave request.
- **Leave Snapshots:** Denormalized, point-in-time JSON representations of leave requests during mutations.

---

## 4. Module Dependencies
All dependencies strictly conform to the `00_ENTERPRISE_MODULE_ARCHITECTURE_STANDARD.md`.

- **Inbound Dependencies:** 
  - External modules (e.g., Attendance, Payroll) may query the `PlatformLeaveSDK` to fetch approved leave periods.
  - The HTTP/REST layer (Gateway/Frontend) interacts via the `LeaveLifecycleController` and `LeaveQueryController`.
- **Outbound Dependencies:**
  - Emits domain events (e.g., `LeaveApprovedEvent`) via the global `PlatformEventPublisher`.
  - May inject `PlatformEmployeeSDK` to validate if an employee is currently active before allowing a leave application.
- **Cross-module interactions:** No direct database or repository querying is permitted across boundaries. All synchronous reads occur exclusively via SDKs.

---

## 5. Module Boundaries
### What belongs inside Leave:
- Leave request validation (sufficient balance, overlapping requests).
- Manager approval hierarchies scoped specifically to leave (though utilizing the Employee module for reporting line resolution).
- Leave accrual ledger updates.

### What does NOT belong inside Leave:
- **Attendance calculations:** Determining if an employee was present or absent on a given day belongs to the Attendance module. (Attendance may listen to Leave events to mark a day as "On Leave").
- **Payroll calculations:** Deducting salary for Loss of Pay (LOP) leaves belongs to the Payroll module. (Payroll queries Leave balances/events during pay runs).
- **Employee profile management:** Updating an employee's department, status, or reporting manager belongs entirely to the Employee module.

---

## 6. Future Components
In accordance with Phase 1 constraints, no implementation has been created. The following components will be implemented in subsequent phases:
- **Controllers:** `LeaveLifecycleController`, `LeaveQueryController`
- **Repositories:** `LveLeaveRequestRepository`, `LveLeaveBalanceRepository`, `LveLeaveTimelineRepository`, `LveLeaveSnapshotRepository`
- **Execution Service:** `LeaveExecutionService`
- **Query Service:** `LeaveQueryService`
- **SDK:** `PlatformLeaveSDK`
- **Handlers:** Command Handlers (e.g., `ApplyLeaveHandler`) and Query Handlers (e.g., `GetLeaveBalanceHandler`)
- **Commands:** Intent POJOs (e.g., `ApplyLeaveCommand`)
- **Queries:** Intent POJOs (e.g., `GetLeaveBalanceQuery`)
- **Events:** Domain Events (e.g., `LeaveAppliedEvent`, `LeaveApprovedEvent`)
- **DTOs:** Request/Response payloads (e.g., `ApplyLeaveRequestDto`)

---

## 7. Compliance
This module skeleton has been verified against:
- **Enterprise Architecture Standard:** Validated against `docs/architecture/00_ENTERPRISE_MODULE_ARCHITECTURE_STANDARD.md`. The directory structure exactly mirrors the required canonical hierarchy.
- **Module Implementation Playbook:** Follows Phase 1 of `docs/architecture/01_MODULE_IMPLEMENTATION_PLAYBOOK.md` strictly. No code implementation has begun.
- **Employee Architecture:** Matches the reference `Employee` bounded context folder structure perfectly.
