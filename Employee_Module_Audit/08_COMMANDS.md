# 08_COMMANDS

## Table of Contents
1. [Overview](#overview)
2. [Command Inventory](#command-inventory)

## Overview
Commands represent an imperative instruction to mutate state within the domain. They are instantiated by Controllers and consumed by Handlers.
- **Validation:** Validation occurs at the HTTP boundary via DTOs. Commands themselves are simple Plain Old JavaScript Objects (POJOs) defining intent.
- **Constructor:** Strict positional arguments.

## Command Inventory

### `BeginProbationCommand`
- **Purpose:** Intent to start an employee's probation period.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `BeginProbationHandler`

### `ConfirmEmployeeCommand`
- **Purpose:** Intent to confirm an employee (end probation).
- **Fields:** `tenantId: string`, `employeeId: string`, `confirmedBy: string`, `confirmedAt: Date`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `ConfirmEmployeeHandler`

### `ExitEmployeeCommand`
- **Purpose:** Intent to process an employee exit.
- **Fields:** `tenantId: string`, `employeeId: string`, `exitDate: string`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `ExitEmployeeHandler`

### `JoinEmployeeCommand`
- **Purpose:** Intent to mark an employee as joined.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `JoinEmployeeHandler`

### `OnboardEmployeeCommand`
- **Purpose:** Intent to onboard a new employee (create draft).
- **Fields:** `tenantId: string`, `data: any` (Note: Gap in typing here, DTO structure is not enforced inside the command).
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `OnboardEmployeeHandler`

### `PromoteEmployeeCommand`
- **Purpose:** Intent to promote an employee to a new assignment.
- **Fields:** `tenantId: string`, `employeeId: string`, `newAssignmentData: any`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `PromoteEmployeeHandler`

### `RehireEmployeeCommand`
- **Purpose:** Intent to rehire a previously exited/terminated employee.
- **Fields:** `tenantId: string`, `employeeId: string`, `initialAssignmentData: any`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `RehireEmployeeHandler`

### `ResignEmployeeCommand`
- **Purpose:** Intent to mark an employee as resigned (entering notice period).
- **Fields:** `tenantId: string`, `employeeId: string`, `resignationDate: string`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `ResignEmployeeHandler`

### `TerminateEmployeeCommand`
- **Purpose:** Intent to terminate an employee immediately.
- **Fields:** `tenantId: string`, `employeeId: string`, `terminationDate: string`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `TerminateEmployeeHandler`

### `TransferEmployeeCommand`
- **Purpose:** Intent to transfer an employee to a new department/branch.
- **Fields:** `tenantId: string`, `employeeId: string`, `newAssignmentData: any`
- **Created By:** `EmployeeLifecycleController`
- **Consumed By:** `TransferEmployeeHandler`
