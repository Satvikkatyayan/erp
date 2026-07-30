# 04 DATABASE BOUNDARY AUDIT

## 1. Database Ownership Principle
Every table in the Enterprise schema belongs exclusively to a single bounded context (module). Cross-module foreign keys at the database level are allowed for relational integrity (e.g., `leave_requests.employee_id` -> `employees.id`), but query execution across these boundaries is strictly regulated.

## 2. Table Ownership Matrix

### Employee Module
- `employees`
- `job_assignments`
- `employee_timelines`
- `employee_snapshots`

### Leave Module
- `leave_requests`
- `leave_balances`
- `leave_policies`
- `leave_timelines`
- `leave_snapshots`

### Payroll Module
- `payruns`
- `payslips`
- `salary_structures`

### Attendance Module
- `punches`
- `shifts`
- `rosters`

## 3. Cross-Module Access Rules
- **Forbidden**: A repository in the Leave Module executing a `JOIN` on the `employees` table.
- **Forbidden**: A service in the Payroll Module directly querying the `leave_balances` table.
- **Allowed**: The Leave Module storing the `employee_id` and fetching the employee's basic details via `PlatformEmployeeSDK.getEmployeeSummary(employeeId)`.

## 4. Repository Ownership
Repositories are strictly scoped to their module's domain entities.
- `EmpEmployeeRepository` manages ONLY `employees`.
- `LeaveRequestRepository` manages ONLY `leave_requests`.
No repository may inject or utilize Prisma schemas belonging to another module.

## 5. Tenant Isolation
Every query and mutation MUST include the `tenant_id` to guarantee multi-tenant data isolation. The repository layer acts as the final gatekeeper to ensure this constraint is never bypassed.

## 6. Future Extension Points
- **Recruitment Schema**: `candidates`, `job_postings`, `applications`. Will reference `employee_id` for hiring managers.
- **File Management Schema**: `file_assets`, `document_access_logs`. Will act as polymorphic associations (e.g., `entity_type`, `entity_id`) to support cross-module attachments without breaking foreign key boundaries.
