# 11_QUERY_HANDLERS

## Table of Contents
1. [Overview](#overview)
2. [Query Handlers Inventory](#query-handlers-inventory)

## Overview
Query Handlers execute a Query object. They strictly perform read operations without side effects.
**Dependencies:** Every single Query Handler strictly injects and delegates to `EmployeeQueryService`. They never publish events, nor do they start Prisma `$transaction` blocks.

## Query Handlers Inventory

### `GetEmployeeProfileHandler`
- **Query:** `GetEmployeeProfileQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeeById(query.tenantId, query.employeeId)`

### `GetEmployeeSummaryHandler`
- **Query:** `GetEmployeeSummaryQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeeSummary(query.tenantId, query.employeeId)`

### `GetCurrentAssignmentHandler`
- **Query:** `GetCurrentAssignmentQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeeJobAssignment(query.tenantId, query.employeeId)`

### `GetAssignmentHistoryHandler`
- **Query:** `GetAssignmentHistoryQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findAssignmentHistory(query.tenantId, query.employeeId)`

### `GetEmployeeTimelineHandler`
- **Query:** `GetEmployeeTimelineQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findTimeline(query.tenantId, query.employeeId)`

### `SearchEmployeesHandler`
- **Query:** `SearchEmployeesQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.searchEmployees(query.tenantId, query.filters, ...)`

### `GetEmployeesByManagerHandler`
- **Query:** `GetEmployeesByManagerQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeesByManager(query.tenantId, query.managerId, ...)`

### `GetEmployeesByDepartmentHandler`
- **Query:** `GetEmployeesByDepartmentQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeesByDepartment(query.tenantId, query.departmentId, ...)`

### `GetEmployeesByProjectHandler`
- **Query:** `GetEmployeesByProjectQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeesByProject(query.tenantId, query.projectId, ...)`

### `GetEmployeesByOrganizationHandler`
- **Query:** `GetEmployeesByOrganizationQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeesByOrganization(query.tenantId, query.organizationId, ...)`

### `GetEmployeesByBranchHandler`
- **Query:** `GetEmployeesByBranchQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmployeesByBranch(query.tenantId, query.branchId, ...)`

### `GetEmploymentStatusHandler`
- **Query:** `GetEmploymentStatusQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findEmploymentStatus(query.tenantId, query.employeeId)`

### `GetExitInformationHandler`
- **Query:** `GetExitInformationQuery`
- **Dependencies:** `EmployeeQueryService`
- **Delegates to:** `queryService.findExitInformation(query.tenantId, query.employeeId)`
