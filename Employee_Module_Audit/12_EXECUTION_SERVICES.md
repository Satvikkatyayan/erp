# 12_EXECUTION_SERVICES

## Table of Contents
1. [EmployeeExecutionService](#employeeexecutionservice)
2. [EmployeeQueryService](#employeequeryservice)

---

## EmployeeExecutionService

**Registration Name:** `EmployeeExecutionService`
**File:** `apps/api/src/modules/employee/services/employee-execution.service.ts`
**Purpose:** Orchestrates all state-mutating business logic for the Employee domain. It manages transaction boundaries, ensures all updates to repositories are atomic, generates timeline and snapshot events, and prepares domain events for publication.
**Lifetime:** Transient/Scoped by default per request (standard NestJS provider).
**Registration Location:** `EmployeeModule`

**Constructor Dependencies:**
- `prisma: PrismaService`
- `sdk: PlatformSDK`
- `employeeRepo: EmpEmployeeRepository`
- `jobAssignmentRepo: EmpJobAssignmentRepository`
- `timelineRepo: EmpEmployeeTimelineRepository`
- `snapshotRepo: EmpEmployeeSnapshotRepository`

**Injected Into:**
- `OnboardEmployeeHandler`
- `JoinEmployeeHandler`
- `BeginProbationHandler`
- `ConfirmEmployeeHandler`
- `TransferEmployeeHandler`
- `PromoteEmployeeHandler`
- `ResignEmployeeHandler`
- `TerminateEmployeeHandler`
- `ExitEmployeeHandler`
- `RehireEmployeeHandler`

**Responsibilities:**
- Transaction ownership (initiates `this.prisma.$transaction`).
- Business state transition validations.
- Timeline and snapshot synchronization.
- Instantiating Domain Events and returning them in an `ExecutionResult`.

**What it explicitly must NEVER do:**
- It never executes Prisma queries directly (delegates to repositories).
- It never publishes events directly (returns them to Handlers).
- It never catches exceptions meant for the API layer (lets them bubble up).

### Public Methods

#### `onboardEmployee`
- **Visibility:** Public
- **Parameters:** `command: OnboardEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `OnboardEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **SDKs Used:** None explicitly in this method.
- **Events Published:** `EmployeeCreatedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`, `WelcomeMailRequestedEvent`
- **Transaction Boundary:** Yes (`this.prisma.$transaction`)
- **Exception Sources:** Prisma constraints (e.g. unique employeeNumber).
- **Business Responsibility:** Creates initial `DRAFT` employee, creates first job assignment, generates timeline and snapshot, triggers welcome mail.

#### `joinEmployee`
- **Visibility:** Public
- **Parameters:** `command: JoinEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `JoinEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeJoinedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is not `DRAFT`, `EXITED`, or `TERMINATED`.
- **Business Responsibility:** Transitions employee to `JOINED` status.

#### `beginProbation`
- **Visibility:** Public
- **Parameters:** `command: BeginProbationCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `BeginProbationHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeProbationStartedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is not `JOINED`.
- **Business Responsibility:** Transitions employee to `PROBATION` status.

#### `confirmEmployee`
- **Visibility:** Public
- **Parameters:** `command: ConfirmEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `ConfirmEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeConfirmedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is not `PROBATION`.
- **Business Responsibility:** Transitions employee to `CONFIRMED` status.

#### `transferEmployee`
- **Visibility:** Public
- **Parameters:** `command: TransferEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `TransferEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeTransferredEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is `EXITED`, `TERMINATED`, or `DRAFT`.
- **Business Responsibility:** Closes current job assignment (sets `effectiveTo`) and opens a new job assignment.

#### `promoteEmployee`
- **Visibility:** Public
- **Parameters:** `command: PromoteEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `PromoteEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeePromotedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is `EXITED`, `TERMINATED`, or `DRAFT`.
- **Business Responsibility:** Closes current job assignment and creates a new one with a higher position/designation.

#### `resignEmployee`
- **Visibility:** Public
- **Parameters:** `command: ResignEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `ResignEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeResignedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is `EXITED`, `TERMINATED`, or `DRAFT`.
- **Business Responsibility:** Transitions employee to `NOTICE_PERIOD` status.

#### `terminateEmployee`
- **Visibility:** Public
- **Parameters:** `command: TerminateEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `TerminateEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeTerminatedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is already `EXITED` or `TERMINATED`.
- **Business Responsibility:** Transitions employee to `TERMINATED` status, closes current assignment.

#### `exitEmployee`
- **Visibility:** Public
- **Parameters:** `command: ExitEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `ExitEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeExitedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is already `EXITED`.
- **Business Responsibility:** Transitions employee to `EXITED` status, closes current assignment.

#### `rehireEmployee`
- **Visibility:** Public
- **Parameters:** `command: RehireEmployeeCommand`
- **Return Type:** `Promise<ExecutionResult<any>>`
- **Called By:** `RehireEmployeeHandler`
- **Repositories Used:** `employeeRepo`, `jobAssignmentRepo`, `timelineRepo`, `snapshotRepo`
- **Events Published:** `EmployeeRehiredEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
- **Transaction Boundary:** Yes
- **Exception Sources:** Throws if employee status is not `EXITED` or `TERMINATED`.
- **Business Responsibility:** Transitions employee back to `JOINED` status and creates a new initial job assignment.

---

## EmployeeQueryService

**Registration Name:** `EmployeeQueryService`
**File:** `apps/api/src/modules/employee/services/employee-query.service.ts`
**Purpose:** Orchestrates all read operations. Consolidates data from multiple repositories if needed.
**Constructor Dependencies:**
- `employeeRepo: EmpEmployeeRepository`
- `jobAssignmentRepo: EmpJobAssignmentRepository`
- `timelineRepo: EmpEmployeeTimelineRepository`

**Injected Into:**
- `PlatformEmployeeSDK`
- All Query Handlers (`GetEmployeeProfileHandler`, etc.)

**Transaction Ownership:** None. Read-only.

### Public Methods

- `findEmployeeById`: Delegates to `employeeRepo.findEmployeeById`.
- `findEmployeeSummary`: Delegates to `employeeRepo.findEmployeeById`.
- `findEmploymentStatus`: Fetches employee and extracts `status`.
- `isEmployeeActive`: Resolves status and checks if it's in `['JOINED', 'PROBATION', 'CONFIRMED', 'NOTICE_PERIOD']`.
- `exists`: Delegates to `employeeRepo.exists`.
- `findEmployeeJobAssignment`: Delegates to `jobAssignmentRepo.findCurrentJobAssignment`.
- `findCurrentDepartment`: Extracts `departmentId` from current assignment.
- `findCurrentDesignation`: Extracts `designationId` from current assignment.
- `findCurrentManager`: Extracts `managerId` from current assignment.
- `findCurrentProject`: Extracts `projectId` from current assignment.
- `findAssignmentHistory`: Delegates to `jobAssignmentRepo.findAssignmentHistory`.
- `findTimeline`: Delegates to `timelineRepo.getTimeline`.
- `searchEmployees`: Delegates to `employeeRepo.searchEmployees`.
- `findEmployeesByManager`: Delegates to `employeeRepo.findEmployeesByManager`.
- `findEmployeesByDepartment`: Delegates to `employeeRepo.findEmployeesByDepartment`.
- `findEmployeesByProject`: Delegates to `employeeRepo.findEmployeesByProject`.
- `findEmployeesByOrganization`: Delegates to `employeeRepo.findEmployeesByOrganization`.
- `findEmployeesByBranch`: Delegates to `employeeRepo.findEmployeesByBranch`.
- `findJoiningDate`: Scans timeline for `JOINED` or `ONBOARDED` event and returns date.
- `findConfirmationStatus`: Returns boolean if status is `CONFIRMED`.
- `isOnProbation`: Returns boolean if status is `PROBATION`.
- `hasCompletedProbation`: Returns true if status in `['CONFIRMED', 'NOTICE_PERIOD', 'EXITED', 'TERMINATED']`.
- `isExited`: Returns true if status in `['EXITED', 'TERMINATED']`.
- `findExitInformation`: Scans timeline for `EXITED`, `TERMINATED`, or `RESIGNED` event and returns metadata.
- `getTeamScopeIds`: Currently a stub returning `[employeeId]`.
