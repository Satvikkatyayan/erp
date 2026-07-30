# 17 MODULE OWNERSHIP MATRIX

This matrix defines the strict boundaries of data ownership and delegation across the enterprise platform.

| Module | Owns | Cannot Own | Uses |
| :--- | :--- | :--- | :--- |
| **Employee** | Profiles, Job Assignments, Lifecycle status. | Time tracking, Payruns, Leaves. | N/A (Root) |
| **Attendance** | Punches, Shifts, Rosters, Timesheets. | Employee data, Leave balances. | Employee |
| **Payroll** | Payruns, Payslips, Salary Structures, Taxes. | Punches, Time-off requests, Employee data. | Employee, Attendance, Leave |
| **Leave** | Requests, Balances, Policies, Approvals. | Roster schedules, Base salary. | Employee |
| **Recruitment** (planned) | Candidates, Job Postings, Applications, Interviews. | Internal Employees, Contracts. | Employee, Communication, Files |
| **Communication** (planned) | Notification Logs, Email Templates, SMS Gateways. | Content generation triggers. | N/A |
| **File Management** (planned) | S3 Metadata, Asset IDs, Document Security. | Entity associations. | N/A |
