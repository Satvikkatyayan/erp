# 19_ERROR_HANDLING

## Table of Contents
1. [Overview](#overview)
2. [Validation Layer](#validation-layer)
3. [Business Logic Exceptions](#business-logic-exceptions)
4. [Database Exceptions](#database-exceptions)
5. [Exception Formats](#exception-formats)

## Overview
Error handling is intentionally decoupled from the Controllers and Handlers. It operates at the boundaries: incoming HTTP validation and outgoing global exception filters.

## Validation Layer
- **Source:** Client input (HTTP payload).
- **Enforcement:** `class-validator` decorators on DTOs.
- **Handling:** NestJS `ValidationPipe` automatically catches these and throws `BadRequestException` before reaching the Controller.

## Business Logic Exceptions
- **Source:** `EmployeeExecutionService`.
- **Enforcement:** Explicit `throw new Error('Message')` (or custom business exceptions if defined globally) when state transitions are invalid (e.g., trying to terminate an already terminated employee).
- **Handling:** The Execution Service throws. The Handler does not catch. The error bubbles up to a Global Exception Filter which translates it into a standard HTTP 400/409 response.

## Database Exceptions
- **Source:** Prisma.
- **Enforcement:** Unique constraint violations (e.g., duplicate `employeeNumber`).
- **Handling:** Bubbles up and is caught by a global Prisma Exception Filter (if implemented at the platform level).

## Exception Formats
All errors returned to the client are mapped to the generic `APIResponseDto`:
```json
{
  "success": false,
  "error": {
    "code": "BAD_REQUEST",
    "message": "Invalid state transition."
  },
  "timestamp": "2026-07-28T12:00:00Z",
  "requestId": "uuid"
}
```
