# 06_CONTROLLERS

## Table of Contents
1. [EmployeeLifecycleController](#employeelifecyclecontroller)
2. [EmployeeQueryController](#employeequerycontroller)
3. [EmployeeAssignmentController](#employeeassignmentcontroller)
4. [EmployeeOrganizationController](#employeeorganizationcontroller)

---

## EmployeeLifecycleController

**Purpose:** Handles all HTTP POST endpoints responsible for executing mutations (lifecycle state changes) for an employee.

**Constructor:**
- `mapper: EmployeeMapper`
- `onboardHandler: OnboardEmployeeHandler`
- `joinHandler: JoinEmployeeHandler`
- `probationHandler: BeginProbationHandler`
- `confirmHandler: ConfirmEmployeeHandler`
- `transferHandler: TransferEmployeeHandler`
- `promoteHandler: PromoteEmployeeHandler`
- `resignHandler: ResignEmployeeHandler`
- `terminateHandler: TerminateEmployeeHandler`
- `exitHandler: ExitEmployeeHandler`
- `rehireHandler: RehireEmployeeHandler`

**Injected Services:** None directly (only handlers and mappers).
**Injected SDKs:** None.

**Decorators:**
- `@ApiTags('Employee Lifecycle')`
- `@ApiBearerAuth()`
- `@UseGuards(JwtAuthGuard, PermissionGuard)`
- `@Controller('employees')`

### Route: `POST /employees/onboard`
- **Purpose:** Onboard a new employee.
- **Decorators:** `@RequirePermissions('employee:onboard')`, `@ApiOperation`, `@ApiHeader`, `@ApiResponse`
- **Validation:** None explicitly in controller (handled by DTO validation pipes).
- **DTOs:** `OnboardEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`
- **Dependencies:** `OnboardEmployeeCommand`, `OnboardEmployeeHandler`
- **Error Responses:** Defined globally; controller does not catch exceptions explicitly.
- **Logging:** None explicitly.

### Route: `POST /employees/:id/join`
- **Purpose:** Mark employee as joined.
- **Decorators:** `@RequirePermissions('employee:join')`, `@HttpCode(200)`
- **DTOs:** `JoinEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/probation`
- **Purpose:** Begin employee probation.
- **Decorators:** `@RequirePermissions('employee:probation')`, `@HttpCode(200)`
- **DTOs:** None (Param `id` only).
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/confirm`
- **Purpose:** Confirm employee.
- **Decorators:** `@RequirePermissions('employee:confirm')`, `@HttpCode(200)`
- **DTOs:** `ConfirmEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/transfer`
- **Purpose:** Transfer employee.
- **Decorators:** `@RequirePermissions('employee:transfer')`, `@HttpCode(200)`
- **DTOs:** `TransferEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/promote`
- **Purpose:** Promote employee.
- **Decorators:** `@RequirePermissions('employee:promote')`, `@HttpCode(200)`
- **DTOs:** `PromoteEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/resign`
- **Purpose:** Mark employee as resigned.
- **Decorators:** `@RequirePermissions('employee:resign')`, `@HttpCode(200)`
- **DTOs:** `ResignEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/terminate`
- **Purpose:** Terminate employee.
- **Decorators:** `@RequirePermissions('employee:terminate')`, `@HttpCode(200)`
- **DTOs:** `TerminateEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/exit`
- **Purpose:** Process employee exit.
- **Decorators:** `@RequirePermissions('employee:exit')`, `@HttpCode(200)`
- **DTOs:** `ExitEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

### Route: `POST /employees/:id/rehire`
- **Purpose:** Rehire an exited employee.
- **Decorators:** `@RequirePermissions('employee:rehire')`, `@HttpCode(200)`
- **DTOs:** `RehireEmployeeRequestDto`
- **Return Type:** `Promise<APIResponseDto<null>>`

---

## EmployeeQueryController

**Purpose:** Handles all HTTP GET endpoints for general employee information (profile, summary, search).

**Constructor:**
- `mapper: EmployeeMapper`
- `profileHandler: GetEmployeeProfileHandler`
- `summaryHandler: GetEmployeeSummaryHandler`
- `timelineHandler: GetEmployeeTimelineHandler`
- `searchHandler: SearchEmployeesHandler`
- `employmentStatusHandler: GetEmploymentStatusHandler`
- `exitInfoHandler: GetExitInformationHandler`

**Decorators:**
- `@ApiTags('Employee Queries')`
- `@ApiBearerAuth()`
- `@UseGuards(JwtAuthGuard, PermissionGuard)`
- `@Controller('employees')`

### Route: `GET /employees/search`
- **Purpose:** Search employees.
- **Decorators:** `@RequirePermissions('employee:read')`
- **DTOs:** `SearchEmployeesDto` (Query parameters)
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/:id`
- **Purpose:** Get employee profile.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any>>`

### Route: `GET /employees/:id/summary`
- **Purpose:** Get employee summary.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any>>`

### Route: `GET /employees/:id/timeline`
- **Purpose:** Get employee timeline.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/:id/employment`
- **Purpose:** Get employment status.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any>>`

### Route: `GET /employees/:id/exit`
- **Purpose:** Get exit information.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any>>`

---

## EmployeeAssignmentController

**Purpose:** Handles all HTTP GET endpoints regarding employee job assignments.

**Constructor:**
- `mapper: EmployeeMapper`
- `currentAssignmentHandler: GetCurrentAssignmentHandler`
- `assignmentHistoryHandler: GetAssignmentHistoryHandler`

**Decorators:**
- `@ApiTags('Employee Assignment')`
- `@ApiBearerAuth()`
- `@UseGuards(JwtAuthGuard, PermissionGuard)`
- `@Controller('employees')`

### Route: `GET /employees/:id/assignment`
- **Purpose:** Get current assignment.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any>>`

### Route: `GET /employees/:id/assignment/history`
- **Purpose:** Get assignment history.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

---

## EmployeeOrganizationController

**Purpose:** Handles all HTTP GET endpoints scoped to organizational grouping (managers, departments, etc.).

**Constructor:**
- `mapper: EmployeeMapper`
- `managerHandler: GetEmployeesByManagerHandler`
- `departmentHandler: GetEmployeesByDepartmentHandler`
- `projectHandler: GetEmployeesByProjectHandler`
- `orgHandler: GetEmployeesByOrganizationHandler`
- `branchHandler: GetEmployeesByBranchHandler`

**Decorators:**
- `@ApiTags('Employee Organization')`
- `@ApiBearerAuth()`
- `@UseGuards(JwtAuthGuard, PermissionGuard)`
- `@Controller('employees')`

### Route: `GET /employees/manager/:managerId`
- **Purpose:** Get employees by manager.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/department/:departmentId`
- **Purpose:** Get employees by department.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/project/:projectId`
- **Purpose:** Get employees by project.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/organization/:organizationId`
- **Purpose:** Get employees by organization.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`

### Route: `GET /employees/branch/:branchId`
- **Purpose:** Get employees by branch.
- **Decorators:** `@RequirePermissions('employee:read')`
- **Return Type:** `Promise<APIResponseDto<any[]>>`
