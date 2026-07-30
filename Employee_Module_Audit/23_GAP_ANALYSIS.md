# 23_GAP_ANALYSIS

## Table of Contents
1. [Overview](#overview)
2. [Identified Gaps in Employee Module](#identified-gaps-in-employee-module)

## Overview
This document highlights incomplete, stubbed, or weakly typed areas within the current Employee module implementation.

## Identified Gaps in Employee Module

### 1. `getTeamScopeIds` Stub
- **File:** `employee-query.service.ts`
- **Issue:** The method is documented to recursively fetch team sub-graphs based on manager hierarchy, but the implementation is a hardcoded stub returning `[employeeId]`.

### 2. Untyped Command Payloads
- **Files:** `onboard-employee.command.ts`, `transfer-employee.command.ts`, `promote-employee.command.ts`, `rehire-employee.command.ts`
- **Issue:** The `data` payloads within these POJOs are typed as `any`. They do not strictly reference the DTOs used at the controller level (e.g., `OnboardingDataDto`).

### 3. Missing Soft Delete Cleanup
- **Issue:** While state transitions to `EXITED` or `TERMINATED` logically remove the employee from active queries, there is no GDPR-compliant hard-delete or PII redaction pipeline documented in the handlers.

### 4. Direct JSON Mapping in SDK
- **Files:** `platform-employee.sdk.ts`
- **Issue:** Many queries return `Promise<any>` or implicitly map the Prisma JSON return type without strict class-transformer conversion back to actual TypeScript instances.
