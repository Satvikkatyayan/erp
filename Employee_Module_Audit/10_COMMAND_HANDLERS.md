# 10_COMMAND_HANDLERS

## Table of Contents
1. [Overview](#overview)
2. [Command Handlers Inventory](#command-handlers-inventory)

## Overview
Command Handlers orchestrate the translation of a Command object into business logic execution. They are strictly responsible for dependency injection of services, invoking the transaction, and publishing resulting events.

**Common Pattern:**
Every handler follows this execution order:
1. Receives `Command`.
2. Calls `EmployeeExecutionService.<method>(command)`.
3. Receives `ExecutionResult` containing mutated data and generated events.
4. Iterates over `events` array.
5. Invokes `PlatformEventPublisher.publish(event)`.
6. Returns `Promise<void>` (or specific success types; controllers rely on the lack of thrown exceptions to determine success).

**Exceptions & Logging:** 
None explicitly handled in the handler layer. Exceptions from `EmployeeExecutionService` bubble up to global filters.

**Transaction Ownership:** 
None. The transaction is owned by `EmployeeExecutionService`.

---

## Command Handlers Inventory

### OnboardEmployeeHandler
- **Command:** `OnboardEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeCreatedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`, `WelcomeMailRequestedEvent`

### JoinEmployeeHandler
- **Command:** `JoinEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeJoinedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### BeginProbationHandler
- **Command:** `BeginProbationCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeProbationStartedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### ConfirmEmployeeHandler
- **Command:** `ConfirmEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeConfirmedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### TransferEmployeeHandler
- **Command:** `TransferEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeTransferredEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### PromoteEmployeeHandler
- **Command:** `PromoteEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeePromotedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### ResignEmployeeHandler
- **Command:** `ResignEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeResignedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### TerminateEmployeeHandler
- **Command:** `TerminateEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeTerminatedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### ExitEmployeeHandler
- **Command:** `ExitEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeExitedEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`

### RehireEmployeeHandler
- **Command:** `RehireEmployeeCommand`
- **Dependencies:** `EmployeeExecutionService`, `PlatformEventPublisher`
- **Events Published:** `EmployeeRehiredEvent`, `EmployeeTimelineCreatedEvent`, `EmployeeSnapshotCreatedEvent`
