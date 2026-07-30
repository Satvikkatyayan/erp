# 05 SDK AUDIT

## 1. SDK Concept
Software Development Kits (SDKs) act as the strict Anti-Corruption Layer (ACL) between modules. Modules are absolutely prohibited from sharing controllers, handlers, services, repositories, or direct database connections. If Module A needs data from Module B, it must invoke `PlatformModuleBSDK`.

## 2. PlatformEmployeeSDK
- **Responsibilities**: Provide read-only identity, profile, and structural data for employees.
- **Public Methods**:
  - `getEmployeeSummary(tenantId: string, employeeId: string): Promise<EmployeeSummaryDto>`
  - `getEmploymentStatus(tenantId: string, employeeId: string): Promise<EmploymentStatusDto>`
- **Consumers**: Leave (to verify identity before creating leave requests), Payroll (to aggregate salary data), Attendance (to map punches to users).
- **Module Boundaries**: Acts as the root identity provider.
- **Violations**: None found. It correctly delegates strictly to `EmployeeQueryService`.

## 3. PlatformLeaveSDK
- **Responsibilities**: Provide absence records, leave balances, and LWP (Leave Without Pay) aggregations.
- **Public Methods**:
  - `getLeaveBalances(tenantId: string, employeeId: string): Promise<LeaveBalanceDto[]>`
  - `getApprovedLeavesForPeriod(tenantId: string, employeeId: string, startDate: Date, endDate: Date): Promise<LeaveRequestDto[]>`
- **Consumers**: Payroll (to deduct LWP from salary computations), ESS Widget.
- **Module Boundaries**: Encapsulates all complex leave policies and workflows behind simple query structures.
- **Violations**: None found. Correctly delegates to `LeaveQueryService`.

## 4. PlatformPayrollSDK
- **Responsibilities**: Provide finalized financial aggregations.
- **Public Methods**: `getLatestPayslip(...)`, `getYtdEarnings(...)`.
- **Consumers**: Employee Self-Service (ESS).
- **Module Boundaries**: Strictly read-only for external services.
- **Violations**: None found.

## 5. PlatformAttendanceSDK
- **Responsibilities**: Provide summarized time entries and shift completions.
- **Public Methods**: `getTimesheetSummary(...)`.
- **Consumers**: Payroll (for hourly wage calculations and overtime).
- **Module Boundaries**: Hides the complex logic of shift rosters and biometric punch pairing.
- **Violations**: None found.

## 6. Future SDK Requirements
- **PlatformRecruitmentSDK**: Will need to expose `CandidateSummaryDto` for pre-boarding workflows.
- **PlatformCommunicationSDK**: Must expose a generalized `send(payload: CommunicationPayloadDto)` method capable of routing emails, SMS, or in-app alerts based on user preferences.
- **PlatformFileManagementSDK**: Must expose `upload(stream, metadata)` and `getPresignedUrl(assetId)`.
