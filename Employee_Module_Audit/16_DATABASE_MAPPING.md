# 16_DATABASE_MAPPING

## Table of Contents
1. [Overview](#overview)
2. [EmpEmployee](#empemployee)
3. [EmpJobAssignment](#empjobassignment)
4. [EmpEmployeeTimeline](#empemployeetimeline)
5. [EmpEmployeeSnapshot](#empemployeesnapshot)

## Overview
This document maps the Prisma schema models to the Employee module Repositories. All models belonging to this module are prefixed with `Emp` (e.g., `EmpEmployee`) to prevent collision with other contexts (e.g., Leave, Payroll).

## EmpEmployee
- **Mapped Repository:** `EmpEmployeeRepository`
- **Table Name:** `@map("emp_employees")` (implied or actual).
- **Primary Key:** `id` (UUID).
- **Tenant Isolation:** `tenantId` (UUID).
- **Organization Isolation:** `organizationId` (UUID).
- **Unique Constraints:** `employeeNumber` (String).
- **Relations:** `EmpPersonalDetails` (1:1), `EmpJobAssignment` (1:N), `EmpEmployeeTimeline` (1:N), `EmpEmployeeSnapshot` (1:N).

## EmpJobAssignment
- **Mapped Repository:** `EmpJobAssignmentRepository`
- **Table Name:** `@map("emp_job_assignments")` (implied or actual).
- **Primary Key:** `id` (UUID).
- **Tenant Isolation:** Implied via parent `employeeId`.
- **Foreign Keys:**
  - `employeeId` -> `EmpEmployee.id` (OnDelete: Cascade)
  - `departmentId` -> `Department.id`
  - `positionId` -> `EmpPosition.id`
  - `branchId` -> `Branch.id`
- **Temporal Fields:**
  - `effectiveFrom` (DateTime, default: now)
  - `effectiveTo` (DateTime, nullable) - Used for Type 2 SCD.

## EmpEmployeeTimeline
- **Mapped Repository:** `EmpEmployeeTimelineRepository`
- **Table Name:** `@map("emp_employee_timeline")`
- **Primary Key:** `id` (UUID).
- **Foreign Keys:**
  - `employeeId` -> `EmpEmployee.id` (OnDelete: Cascade)
- **Fields:**
  - `eventType` (String - JOINED, PROMOTED, etc.)
  - `eventDate` (DateTime)
  - `description` (String)
  - `metadata` (Json, nullable)

## EmpEmployeeSnapshot
- **Mapped Repository:** `EmpEmployeeSnapshotRepository`
- **Table Name:** `@map("emp_employee_snapshots")`
- **Primary Key:** `id` (UUID).
- **Foreign Keys:**
  - `employeeId` -> `EmpEmployee.id` (OnDelete: Cascade)
- **Fields:**
  - `payload` (Json) - Flattened denormalized copy of employee state.
  - `generatedAt` (DateTime)
