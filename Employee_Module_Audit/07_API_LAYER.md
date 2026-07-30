# 07_API_LAYER

## Table of Contents
1. [Overview](#overview)
2. [Request DTOs](#request-dtos)
3. [Query DTOs](#query-dtos)
4. [Response DTOs](#response-dtos)
5. [Mappers](#mappers)
6. [Validation Decorators](#validation-decorators)

## Overview
The API layer defines the strict contract between external clients (HTTP/REST) and the internal Domain layer. It is composed of Request Data Transfer Objects (DTOs), Query DTOs (for GET requests), Response DTOs, and Mappers.

## Request DTOs
File: `apps/api/src/modules/employee/api/dtos/requests.dto.ts`

### `AssignmentDataDto`
- **Fields:** `departmentId` (UUID, required), `roleId` (UUID, required), `managerId` (UUID, optional)
- **Validation:** `@IsUUID()`, `@IsNotEmpty()`, `@IsOptional()`
- **Swagger:** `@ApiProperty`, `@ApiPropertyOptional`

### `OnboardingDataDto`
- **Fields:** `firstName` (String, required), `lastName` (String, required), `email` (String, required)
- **Validation:** `@IsString()`, `@IsNotEmpty()`

### `OnboardEmployeeRequestDto`
- **Fields:** `data` (Type: `OnboardingDataDto`, required)
- **Validation:** `@ValidateNested()`, `@Type(() => OnboardingDataDto)`

### `JoinEmployeeRequestDto`
- **Fields:** None. Represents an empty payload intention to join.

### `TransferEmployeeRequestDto`
- **Fields:** `newAssignmentData` (Type: `AssignmentDataDto`)

### `PromoteEmployeeRequestDto`
- **Fields:** `newAssignmentData` (Type: `AssignmentDataDto`)

### `ResignEmployeeRequestDto`
- **Fields:** `resignationDate` (ISO DateString, required)
- **Validation:** `@IsDateString()`

### `TerminateEmployeeRequestDto`
- **Fields:** `terminationDate` (ISO DateString, required)
- **Validation:** `@IsDateString()`

### `ExitEmployeeRequestDto`
- **Fields:** `exitDate` (ISO DateString, required)
- **Validation:** `@IsDateString()`

### `RehireEmployeeRequestDto`
- **Fields:** `initialAssignmentData` (Type: `AssignmentDataDto`)

### `ConfirmEmployeeRequestDto`
- **Fields:** `confirmedBy` (UUID, required), `confirmedAt` (ISO DateString, required)

## Query DTOs
File: `apps/api/src/modules/employee/api/dtos/queries.dto.ts`

### `PaginationDto`
- **Fields:** `page` (Number, default 1, min 1), `limit` (Number, default 20, min 1, max 100)
- **Validation:** `@IsNumber()`, `@Type(() => Number)`

### `SortDto`
- **Fields:** `sortBy` (String), `sortOrder` ('asc' | 'desc')

### `EmployeeFilterDto`
- **Fields:** `status` (String)

### `SearchEmployeesDto`
- **Fields:** `filters` (JSON stringified), `sort` (JSON stringified)
- **Validation:** `@IsString()`

## Response DTOs
File: `apps/api/src/modules/employee/api/dtos/responses.dto.ts`

### `APIResponseDto<T>`
- **Type:** Generic class.
- **Fields:**
  - `success`: boolean
  - `data?`: T
  - `message?`: string
  - `error?`: { code: string, message: string, details?: any[] }
  - `timestamp`: string (ISO Date)
  - `requestId`: string
- **Serialization:** Used to wrap every successful and failed response.

## Mappers
File: `apps/api/src/modules/employee/api/mappers/employee.mapper.ts`

### `EmployeeMapper`
- **Constructor:** `contextService: RequestContextService`
- **Methods:**
  - `success<T>(data: T, message?: string): APIResponseDto<T>`
    - Injects `timestamp: new Date().toISOString()`
    - Injects `requestId: this.contextService.correlationId`
  - `error(code: string, message: string, details?: any[]): APIResponseDto<null>`
    - Wraps error payload.
- **Factory Methods:** None.
- **Transformation:** Exclusively maps from handler `QueryResult` / `ExecutionResult` to HTTP-friendly `APIResponseDto`.

## Validation Decorators
- Standard `class-validator` decorators used throughout (`@IsString`, `@IsNotEmpty`, `@IsUUID`, `@IsDateString`, `@IsNumber`, `@IsObject`, `@ValidateNested`).
- Used in conjunction with `class-transformer` (`@Type`).
