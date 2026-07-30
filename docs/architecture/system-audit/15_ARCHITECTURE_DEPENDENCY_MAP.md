# 15 ARCHITECTURE DEPENDENCY MAP

```mermaid
graph TD
    %% Global Platform Services
    Auth[Authentication Service]
    RBAC[Authorization Service]
    Events[Event Publisher]
    Communication[Future: Communication Service]
    Files[Future: File Management Service]

    subgraph HRMS Core
        Employee[Employee Module]
        Attendance[Attendance Module]
        Payroll[Payroll Module]
        Leave[Leave Module]
        Recruitment[Future: Recruitment Module]
    end

    %% SDK Boundaries (Solid Lines)
    Leave -->|Consumes SDK| Employee
    Attendance -->|Consumes SDK| Employee
    Payroll -->|Consumes SDK| Employee
    Payroll -->|Consumes SDK| Leave
    Payroll -->|Consumes SDK| Attendance
    
    Recruitment -->|Consumes SDK| Employee
    Recruitment -->|Consumes SDK| Communication
    Recruitment -->|Consumes SDK| Files
    Leave -->|Consumes SDK| Communication

    %% Event Boundaries (Dotted Lines)
    Employee -.->|Publishes employee.onboarded| Events
    Events -.->|Triggers Balance Provisioning| Leave
    Employee -.->|Publishes employee.promoted| Events
    Events -.->|Triggers Salary Update| Payroll

    %% Internal Database Ownership
    Employee --- DB_Emp[(Employee DB)]
    Attendance --- DB_Att[(Attendance DB)]
    Payroll --- DB_Pay[(Payroll DB)]
    Leave --- DB_Lev[(Leave DB)]
    Recruitment --- DB_Rec[(Recruitment DB)]

    classDef core fill:#0b3b60,stroke:#0f5286,stroke-width:2px,color:#fff;
    classDef future fill:#3a4b5c,stroke:#4a5f73,stroke-width:2px,color:#fff,stroke-dasharray: 5 5;
    classDef platform fill:#005c4b,stroke:#008069,stroke-width:2px,color:#fff;

    class Employee,Attendance,Payroll,Leave core;
    class Recruitment,Communication,Files future;
    class Auth,RBAC,Events platform;
```

## Description
This diagram represents the strict macro-architecture of the ERP. 
- **Solid arrows** represent synchronous data fetching via SDK boundaries.
- **Dotted arrows** represent asynchronous, decoupled side-effects via the Event Publisher.
- Databases remain strictly isolated per module. Cross-module database queries are architecturally impossible.
