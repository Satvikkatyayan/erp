# 02 MODULE DEPENDENCY MAP

This document details the exact dependencies, ownership, and allowed cross-module interactions for every module.

---

## 1. Employee Module
- **Owns**: Employee Profiles, Job Assignments, Employment Status, Employee Timelines, Employee Snapshots.
- **Consumes**: None (Root Module).
- **Publishes**: Employee Onboarded, Employee Terminated, Employee Promoted, etc.
- **SDK Exposed**: `PlatformEmployeeSDK`.
- **Events Published**: `employee.onboarded`, `employee.terminated`, `employee.joined`.
- **Events Consumed**: None.
- **Allowed Dependencies**: Core platform services (Events, Auth).
- **Forbidden Dependencies**: Leave, Payroll, Attendance.
- **Database Ownership**: `Employee`, `JobAssignment`, `EmployeeTimeline`, `EmployeeSnapshot`.
- **Public APIs**: `GET /employees/*`, `POST /employees/*`.
- **Who may call**: Payroll, Leave, Attendance, Recruitment.
- **Who must never call**: N/A (Root).
- **Dependency Graph**: Independent.
- **Data Flow**: Core identity provisioning flows downstream.

---

## 2. Leave Module
- **Owns**: Leave Requests, Leave Policies, Leave Balances, Leave Timelines, Leave Snapshots.
- **Consumes**: Employee Module (via `PlatformEmployeeSDK`).
- **Publishes**: Leave Applied, Leave Approved, Leave Cancelled, Leave Rejected.
- **SDK Exposed**: `PlatformLeaveSDK`.
- **Events Published**: `leave.applied`, `leave.approved`, `leave.rejected`.
- **Events Consumed**: `employee.onboarded` (to initialize balances).
- **Allowed Dependencies**: Employee SDK.
- **Forbidden Dependencies**: Payroll, Attendance.
- **Database Ownership**: `LeaveRequest`, `LeavePolicy`, `LeaveBalance`, `LeaveTimeline`, `LeaveSnapshot`.
- **Public APIs**: `GET /leaves/*`, `POST /leaves/*`.
- **Who may call**: Payroll, Recruitment.
- **Who must never call**: Attendance.
- **Dependency Graph**: Depends on Employee.
- **Data Flow**: Receives Employee ID context, manages absence lifecycle.

---

## 3. Payroll Module
- **Owns**: Payruns, Payslips, Salary Structures, Tax Components.
- **Consumes**: Employee SDK, Leave SDK, Attendance SDK.
- **Publishes**: Payrun Processed, Payslip Generated.
- **SDK Exposed**: `PlatformPayrollSDK`.
- **Events Published**: `payroll.processed`.
- **Events Consumed**: `employee.promoted` (salary updates), `leave.approved` (LWP calculations).
- **Allowed Dependencies**: Employee SDK, Leave SDK, Attendance SDK.
- **Forbidden Dependencies**: N/A (Payroll is a consumer of all).
- **Database Ownership**: `Payrun`, `Payslip`, `SalaryStructure`.
- **Public APIs**: `GET /payroll/*`, `POST /payroll/*`.
- **Who may call**: Finance/Admin services.
- **Who must never call**: Leave, Attendance (Cycle dependencies).
- **Dependency Graph**: Depends on Employee, Leave, Attendance.
- **Data Flow**: Aggregates data from all core HR modules to compute financials.

---

## 4. Attendance Module
- **Owns**: Punches, Shifts, Timesheets, Shift Rosters.
- **Consumes**: Employee SDK.
- **Publishes**: Punch Logged, Shift Completed.
- **SDK Exposed**: `PlatformAttendanceSDK`.
- **Events Published**: `attendance.punched`.
- **Events Consumed**: `employee.onboarded`.
- **Allowed Dependencies**: Employee SDK.
- **Forbidden Dependencies**: Leave, Payroll.
- **Database Ownership**: `Punch`, `Shift`, `Timesheet`.
- **Public APIs**: `GET /attendance/*`, `POST /attendance/*`.
- **Who may call**: Payroll.
- **Who must never call**: Leave.
- **Dependency Graph**: Depends on Employee.
- **Data Flow**: Captures raw time entries for downstream aggregation.

---

## 5. Future: Recruitment Module
- **Owns**: Job Postings, Candidate Profiles, Applications, Interviews.
- **Consumes**: Employee SDK, Communication SDK, File Management SDK.
- **Publishes**: Candidate Hired, Application Received.
- **SDK Exposed**: `PlatformRecruitmentSDK`.
- **Database Ownership**: `Candidate`, `JobPosting`, `Application`.

---

## 6. Future: Communication Service
- **Owns**: Email Templates, Notification Logs, SMS Gateways.
- **Consumes**: None.
- **Publishes**: Message Sent, Delivery Failed.
- **SDK Exposed**: `PlatformCommunicationSDK`.
- **Database Ownership**: `NotificationLog`, `MessageTemplate`.

---

## 7. Future: File Management Service
- **Owns**: S3 Pointers, Asset Metadata, Attachments, Document Security.
- **Consumes**: None.
- **Publishes**: File Uploaded, File Deleted.
- **SDK Exposed**: `PlatformFileManagementSDK`.
- **Database Ownership**: `FileAsset`, `DocumentAccessLog`.
