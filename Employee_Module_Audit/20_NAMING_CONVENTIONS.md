# 20_NAMING_CONVENTIONS

## Table of Contents
1. [Overview](#overview)
2. [File Naming](#file-naming)
3. [Class Naming](#class-naming)
4. [Database Models](#database-models)

## Overview
Strict naming conventions ensure predictability across the module and platform.

## File Naming
- **Format:** `kebab-case.suffix.ts`
- **Controllers:** `*-lifecycle.controller.ts`, `*-query.controller.ts`
- **Services:** `*-execution.service.ts`, `*-query.service.ts`
- **Handlers:** `[action]-employee.handler.ts` (e.g., `onboard-employee.handler.ts`)
- **Commands/Queries:** `[action]-employee.command.ts`, `get-*.query.ts`
- **Repositories:** `[entity].repository.ts` (e.g., `job-assignment.repository.ts`)
- **SDK:** `platform-[context].sdk.ts`

## Class Naming
- **Format:** PascalCase.
- **Controllers:** `EmployeeLifecycleController`
- **Services:** `EmployeeExecutionService`
- **Handlers:** `OnboardEmployeeHandler`
- **Commands/Queries:** `OnboardEmployeeCommand`, `GetEmployeeProfileQuery`
- **Repositories:** `EmpEmployeeRepository` (Note the prefix to match the entity).
- **SDK:** `PlatformEmployeeSDK`

## Database Models
- **Format:** PascalCase with `Emp` prefix.
- **Entities:** `EmpEmployee`, `EmpJobAssignment`
- **Tables:** `emp_employees`, `emp_job_assignments` (snake_case with `emp_` prefix).
- **Why:** Ensures table names across the monolith do not collide (e.g., `EmpEmployeeTimeline` vs `LveLeaveTimeline`).
