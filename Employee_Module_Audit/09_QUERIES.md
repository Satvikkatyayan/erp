# 09_QUERIES

## Table of Contents
1. [Overview](#overview)
2. [Query Inventory](#query-inventory)

## Overview
Queries represent a read-only request for domain state. They are POJOs instantiated by Controllers (or SDKs indirectly) and consumed by Query Handlers. Like Commands, Queries carry intent but do not mutate state.

## Query Inventory

### `GetEmployeeProfileQuery`
- **Purpose:** Request full profile of an employee.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `GetEmployeeProfileHandler`

### `GetEmployeeSummaryQuery`
- **Purpose:** Request lightweight summary of an employee.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `GetEmployeeSummaryHandler`

### `GetCurrentAssignmentQuery`
- **Purpose:** Request the currently active job assignment.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeAssignmentController`
- **Consumed By:** `GetCurrentAssignmentHandler`

### `GetAssignmentHistoryQuery`
- **Purpose:** Request historical list of all job assignments.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeAssignmentController`
- **Consumed By:** `GetAssignmentHistoryHandler`

### `GetEmployeeTimelineQuery`
- **Purpose:** Request the timeline/audit trail of an employee.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `GetEmployeeTimelineHandler`

### `SearchEmployeesQuery`
- **Purpose:** Request a list of employees matching specific filters.
- **Fields:** `tenantId: string`, `filters: any`, `sort: any`, `pagination: any`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `SearchEmployeesHandler`

### `GetEmployeesByManagerQuery`
- **Purpose:** Request all employees reporting to a specific manager.
- **Fields:** `tenantId: string`, `managerId: string`, `filters?: any`, `sort?: any`
- **Created By:** `EmployeeOrganizationController`
- **Consumed By:** `GetEmployeesByManagerHandler`

### `GetEmployeesByDepartmentQuery`
- **Purpose:** Request all employees in a specific department.
- **Fields:** `tenantId: string`, `departmentId: string`, `filters?: any`, `sort?: any`
- **Created By:** `EmployeeOrganizationController`
- **Consumed By:** `GetEmployeesByDepartmentHandler`

### `GetEmployeesByProjectQuery`
- **Purpose:** Request all employees assigned to a specific project.
- **Fields:** `tenantId: string`, `projectId: string`, `filters?: any`, `sort?: any`
- **Created By:** `EmployeeOrganizationController`
- **Consumed By:** `GetEmployeesByProjectHandler`

### `GetEmployeesByOrganizationQuery`
- **Purpose:** Request all employees in an organization (legal entity).
- **Fields:** `tenantId: string`, `organizationId: string`, `filters?: any`, `sort?: any`
- **Created By:** `EmployeeOrganizationController`
- **Consumed By:** `GetEmployeesByOrganizationHandler`

### `GetEmployeesByBranchQuery`
- **Purpose:** Request all employees located at a specific branch.
- **Fields:** `tenantId: string`, `branchId: string`, `filters?: any`, `sort?: any`
- **Created By:** `EmployeeOrganizationController`
- **Consumed By:** `GetEmployeesByBranchHandler`

### `GetEmploymentStatusQuery`
- **Purpose:** Request only the current macro employment status string.
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `GetEmploymentStatusHandler`

### `GetExitInformationQuery`
- **Purpose:** Request metadata surrounding an employee's exit (resignation date, exit date, reason).
- **Fields:** `tenantId: string`, `employeeId: string`
- **Created By:** `EmployeeQueryController`
- **Consumed By:** `GetExitInformationHandler`
