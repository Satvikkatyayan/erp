# 15_EVENTS

## Table of Contents
1. [Overview](#overview)
2. [Event Publisher Integration](#event-publisher-integration)
3. [Event Inventory](#event-inventory)

## Overview
Domain Events are the primary mechanism for cross-context choreography within the HRMS monolith. When an employee's state changes, the `EmployeeExecutionService` instantiates event objects. These are handed back to the `CommandHandler`, which publishes them via the globally injected `PlatformEventPublisher`.

## Event Publisher Integration
- **Publisher:** `PlatformEventPublisher.publish(event: DomainEvent)`
- **Interface:** Every event must implement the `DomainEvent` interface (usually dictating `id`, `name`, `timestamp`, `tenantId`, `payload`).
- **Transactionality:** Events are published **AFTER** the Prisma `$transaction` commits successfully.

## Event Inventory

### 1. `EmployeeCreatedEvent`
- **Trigger:** Onboarding a new employee (`DRAFT`).
- **Payload:** `employeeId`, `tenantId`, `employeeNumber`, `firstName`, `lastName`, `email`.

### 2. `EmployeeJoinedEvent`
- **Trigger:** Employee transitions to `JOINED`.
- **Payload:** `employeeId`, `tenantId`, `joinedDate`.

### 3. `EmployeeProbationStartedEvent`
- **Trigger:** Employee transitions to `PROBATION`.
- **Payload:** `employeeId`, `tenantId`, `probationStartDate`.

### 4. `EmployeeConfirmedEvent`
- **Trigger:** Employee transitions to `CONFIRMED`.
- **Payload:** `employeeId`, `tenantId`, `confirmedDate`, `confirmedBy`.

### 5. `EmployeeTransferredEvent`
- **Trigger:** Employee moves to a new department or branch.
- **Payload:** `employeeId`, `tenantId`, `oldAssignmentId`, `newAssignmentId`.

### 6. `EmployeePromotedEvent`
- **Trigger:** Employee promoted to a higher designation.
- **Payload:** `employeeId`, `tenantId`, `oldAssignmentId`, `newAssignmentId`.

### 7. `EmployeeResignedEvent`
- **Trigger:** Employee submits resignation (transitions to `NOTICE_PERIOD`).
- **Payload:** `employeeId`, `tenantId`, `resignationDate`.

### 8. `EmployeeTerminatedEvent`
- **Trigger:** Employee is fired/terminated.
- **Payload:** `employeeId`, `tenantId`, `terminationDate`.

### 9. `EmployeeExitedEvent`
- **Trigger:** Employee successfully finishes off-boarding (transitions to `EXITED`).
- **Payload:** `employeeId`, `tenantId`, `exitDate`.

### 10. `EmployeeRehiredEvent`
- **Trigger:** Exited/Terminated employee is brought back (`JOINED`).
- **Payload:** `employeeId`, `tenantId`, `rehireDate`.

### 11. `EmployeeTimelineCreatedEvent`
- **Trigger:** A new timeline entry is added.
- **Payload:** `employeeId`, `tenantId`, `timelineId`, `eventType`.

### 12. `EmployeeSnapshotCreatedEvent`
- **Trigger:** A new snapshot JSON is generated.
- **Payload:** `employeeId`, `tenantId`, `snapshotId`.

### 13. `WelcomeMailRequestedEvent`
- **Trigger:** Explicitly requested during Onboarding.
- **Payload:** `employeeId`, `tenantId`, `email`.
