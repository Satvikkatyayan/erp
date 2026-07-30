# 13_REPOSITORIES

## Table of Contents
1. [Overview](#overview)
2. [EmpEmployeeRepository](#empemployeerepository)
3. [EmpJobAssignmentRepository](#empjobassignmentrepository)
4. [EmpEmployeeTimelineRepository](#empemployeetimelinedepository)
5. [EmpEmployeeSnapshotRepository](#empemployeesnapshotrepository)

## Overview
Repositories are the strict data access layer in the Employee bounded context.
- **Transaction Participation:** Every mutation method accepts an optional `tx: any` parameter. If `tx` is provided, the repository uses it to participate in an upstream Prisma transaction (`client = tx || this.prisma`).
- **Prisma Direct Usage:** Repositories are the *only* files that inject `PrismaService` and execute queries.

---

## EmpEmployeeRepository

**Purpose:** Manages the `EmpEmployee` entity and its direct details.
**Owned Entity:** `EmpEmployee`
**Prisma Delegate:** `this.prisma.empEmployee`
**Consumers:** `EmployeeExecutionService`, `EmployeeQueryService`
**Dependencies:** `PrismaService`

### Methods

#### `createEmployee`
- **Type:** Mutation
- **Parameters:** `tenantId`, `organizationId`, `employeeNumber`, `status`, `tx?`
- **Return Type:** `Promise<any>`
- **Transaction Participation:** Yes
- **Prisma Action:** `create` with generated `uuidv4()`.

#### `getEmployeeById` & `findEmployeeById`
- **Type:** Query
- **Parameters:** `tenantId`, `id`, `tx?`
- **Return Type:** `Promise<any>`
- **Transaction Participation:** Yes
- **Prisma Action:** `findFirst` where `{ tenantId, id }` includes `{ personalDetails: true }`.

#### `findEmployeesByDepartment`
- **Type:** Query
- **Parameters:** `tenantId`, `departmentId`, `filters?`, `sort?`, `tx?`
- **Return Type:** `Promise<any[]>`
- **Filtering:** Merges `filters` into Prisma `where`.
- **Sorting:** Uses `sort` object or defaults to `{ createdAt: 'desc' }`.
- **Prisma Action:** `findMany`

#### `findEmployeesByManager`
- **Type:** Query
- **Parameters:** `tenantId`, `managerId`, `filters?`, `sort?`, `tx?`
- **Return Type:** `Promise<any[]>`

#### `updateEmployeeStatus`
- **Type:** Mutation
- **Parameters:** `tenantId`, `id`, `status`, `tx?`
- **Return Type:** `Promise<any>`
- **Prisma Action:** `updateMany` (used instead of `update` to safely handle `tenantId` composite checking, even though `id` is primary).

#### `exists`
- **Type:** Query
- **Prisma Action:** `count` where `> 0`.

#### `findEmployeesByProject`, `findEmployeesByOrganization`, `findEmployeesByBranch`, `searchEmployees`
- **Type:** Query
- **Index Usage:** Relies on foreign keys (e.g., `jobAssignments: { some: { projectId } }`).
- **Sorting/Filtering:** Standardized default `{ createdAt: 'desc' }`.

**Soft Delete Strategy:** Not implemented natively via `deletedAt` field; deletion is managed via status transitions (`EXITED`, `TERMINATED`).
**History Strategy:** Delegated to `Timeline` and `Snapshot` repositories.

---

## EmpJobAssignmentRepository

**Purpose:** Manages employee job history and current active assignments.
**Owned Entity:** `EmpJobAssignment`
**Prisma Delegate:** `this.prisma.empJobAssignment`
**Consumers:** `EmployeeExecutionService`, `EmployeeQueryService`

### Methods

#### `createJobAssignment`
- **Type:** Mutation
- **Parameters:** `tenantId`, `employeeId`, `data`, `tx?`
- **Prisma Action:** `create`

#### `getCurrentJobAssignment` & `findCurrentJobAssignment`
- **Type:** Query
- **Parameters:** `tenantId`, `employeeId`, `tx?`
- **Prisma Action:** `findFirst` where `effectiveTo: null`, ordered by `effectiveFrom: 'desc'`.

#### `closeCurrentJobAssignment`
- **Type:** Mutation
- **Parameters:** `tenantId`, `employeeId`, `effectiveTo`, `tx?`
- **Prisma Action:** Calls `getCurrentJobAssignment`, if found, performs `update` setting `effectiveTo`.
- **History Strategy:** This method implements the Type 2 Slowly Changing Dimension (SCD) pattern. Old assignments get an `effectiveTo` date; new assignments are created via `createJobAssignment`.

#### `findAssignmentHistory`
- **Type:** Query
- **Prisma Action:** `findMany` ordered by `effectiveFrom: 'desc'`.

---

## EmpEmployeeTimelineRepository

**Purpose:** Append-only event store for human-readable audit trails.
**Owned Entity:** `EmpEmployeeTimeline`
**Prisma Delegate:** `this.prisma.empEmployeeTimeline`
**Consumers:** `EmployeeExecutionService`, `EmployeeQueryService`

### Methods

#### `createTimelineEntry`
- **Type:** Mutation
- **Parameters:** `tenantId`, `employeeId`, `eventType`, `eventData`, `tx?`
- **Prisma Action:** `create` appending the metadata.

#### `getTimeline`
- **Type:** Query
- **Prisma Action:** `findMany` ordered by `eventDate: 'desc'`.

---

## EmpEmployeeSnapshotRepository

**Purpose:** Point-in-time flattened JSON copies of the employee state.
**Owned Entity:** `EmpEmployeeSnapshot`
**Prisma Delegate:** `this.prisma.empEmployeeSnapshot`
**Consumers:** `EmployeeExecutionService`

### Methods

#### `createSnapshot`
- **Type:** Mutation
- **Parameters:** `tenantId`, `employeeId`, `snapshotData`, `tx?`
- **Prisma Action:** `create` storing `snapshotData` as JSON payload.
- **Snapshot Strategy:** Every time a mutation completes in `EmployeeExecutionService`, the entire employee tree (core + assignment) is stringified/saved to `payload`.

#### `getLatestSnapshot`
- **Type:** Query
- **Prisma Action:** `findFirst` ordered by `generatedAt: 'desc'`.
