# 18_LOGGING_AND_AUDIT

## Table of Contents
1. [Overview](#overview)
2. [Timeline Pattern](#timeline-pattern)
3. [Snapshot Pattern](#snapshot-pattern)
4. [Application Logging](#application-logging)

## Overview
The Employee module implements a robust, cryptographically-inspired audit trail. It does not rely on simple application logs for business auditing. Instead, it uses a dual-layer approach: Timelines (for human-readable narratives) and Snapshots (for point-in-time state reconstruction).

## Timeline Pattern
- **Purpose:** To provide a human-readable, chronological narrative of what happened to an employee.
- **Trigger:** Every mutation command executed by `EmployeeExecutionService`.
- **Implementation:** `timelineRepo.createTimelineEntry(tenantId, employeeId, eventType, eventData, tx)`.
- **Characteristics:**
  - Append-only.
  - Participates in the same transaction as the core mutation.
  - Can never be updated or deleted.

## Snapshot Pattern
- **Purpose:** To capture the exact state of the employee graph (profile + assignments) at the exact moment a mutation occurred.
- **Trigger:** Every mutation command executed by `EmployeeExecutionService`.
- **Implementation:** `snapshotRepo.createSnapshot(tenantId, employeeId, snapshotData, tx)`.
- **Characteristics:**
  - Append-only.
  - Participates in the same transaction as the core mutation.
  - JSON payload for schema-less persistence (allows historical records to survive future schema migrations).

## Application Logging
- **Mechanism:** Standard NestJS `Logger`.
- **Implementation:** Not heavily implemented in the business layers (Handlers/Services). The architecture favors domain events and database audit tables over unstructured `stdout` logs for tracing business logic. Global exception filters handle HTTP error logging.
