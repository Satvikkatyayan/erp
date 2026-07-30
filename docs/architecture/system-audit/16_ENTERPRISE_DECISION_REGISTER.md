# 16 ENTERPRISE DECISION REGISTER

This register records all major architectural decisions approved during the current iteration (Leave Module Completion & Baseline Audit).

---

## ED-001: Architectural Freeze

- **Decision**: Freeze all foundational architecture patterns (CQRS, Repository Encapsulation, SDK Boundaries, Directory Topology).
- **Reason**: To guarantee long-term stability and prevent architectural drift as new modules are developed.
- **Impact**: No future module may introduce new core structural patterns without a formal, cross-module refactoring consensus.
- **Status**: **Approved**
- **Affected Modules**: Employee, Attendance, Payroll, Leave, and all future modules.

## ED-002: Missing Module Registration Resolution

- **Decision**: Provider topologies must exactly mirror their dependencies at the module level (e.g., `LeaveMapper` added to `providers`).
- **Reason**: To prevent hidden runtime DI failures that are only caught during execution.
- **Impact**: Strict verification of dependency graphs via `nest build` is now a mandatory acceptance criterion.
- **Status**: **Approved**
- **Affected Modules**: Leave (retroactively verified across others).

## ED-003: SDK-Only Cross-Module Aggregation

- **Decision**: Complex aggregations (e.g., fetching a user's employment status and their leave balances) must occur via SDK invocation, never via cross-module database joins.
- **Reason**: To preserve module isolation and boundary integrity.
- **Impact**: Repositories are strictly forbidden from joining tables outside their bounded context.
- **Status**: **Approved**
- **Affected Modules**: Payroll, Leave, Attendance, Employee.
