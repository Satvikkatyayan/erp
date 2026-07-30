# 02_FOLDER_STRUCTURE

## Table of Contents
1. [Overview](#overview)
2. [Folder Hierarchy](#folder-hierarchy)

## Overview
The Employee module is structured following a strict Enterprise Modular Monolith architecture relying on CQRS and Repository patterns.

## Folder Hierarchy

### pps/api/src/modules/employee/
- **Purpose:** Root directory of the Employee bounded context.
- **Dependencies:** None directly, acts as a container.
- **Public/Internal:** Internal.
- **Children:** pi/, commands/, controllers/, events/, queries/, epositories/, sdk/, services/.

### pi/
- **Purpose:** Contains all API-layer transport structures (Data Transfer Objects and Mappers).
- **Parent:** employee/
- **Children:** dtos/, mappers/
- **Dependencies:** class-validator, class-transformer, @nestjs/swagger.
- **Public/Internal:** Public to the REST client, internal to the module.

### pi/dtos/
- **Purpose:** Holds Request and Response definitions for strict type checking and validation of incoming/outgoing HTTP payloads.
- **Parent:** pi/
- **Children:** None.

### pi/mappers/
- **Purpose:** Centralizes payload transformation, converting internal handler results into standardized API responses (APIResponseDto).
- **Parent:** pi/
- **Children:** None.

### commands/
- **Purpose:** Contains all Command definitions and their respective Handlers. Commands represent an intent to mutate state.
- **Parent:** employee/
- **Children:** handlers/
- **Dependencies:** None.

### commands/handlers/
- **Purpose:** Contains Command Handlers that orchestrate the execution of a specific command.
- **Parent:** commands/
- **Children:** None.
- **Dependencies:** EmployeeExecutionService, PlatformEventPublisher, commands/.

### controllers/
- **Purpose:** Houses the HTTP routing layer. Translates HTTP requests into Commands/Queries.
- **Parent:** employee/
- **Children:** None.
- **Dependencies:** commands/, queries/, pi/, Guards.
- **Public/Internal:** Public (Exposed over HTTP).

### events/
- **Purpose:** Defines Domain Events that the Employee module emits.
- **Parent:** employee/
- **Children:** None.
- **Dependencies:** DomainEvent interface, uuid.
- **Public/Internal:** Internal (Definitions are internal, published payloads are consumed globally).

### queries/
- **Purpose:** Contains all Query definitions and their respective Handlers. Queries represent an intent to read state.
- **Parent:** employee/
- **Children:** handlers/
- **Dependencies:** None.

### queries/handlers/
- **Purpose:** Contains Query Handlers that execute queries to fetch data without side effects.
- **Parent:** queries/
- **Children:** None.
- **Dependencies:** EmployeeQueryService, queries/.

### epositories/
- **Purpose:** Contains Data Access classes. The only layer allowed to communicate with Prisma.
- **Parent:** employee/
- **Children:** None.
- **Dependencies:** PrismaService.
- **Public/Internal:** Internal. Strictly hidden from external modules.

### sdk/
- **Purpose:** Contains the public API exposed to other bounded contexts within the monolith.
- **Parent:** employee/
- **Children:** dtos/
- **Dependencies:** EmployeeQueryService.
- **Public/Internal:** Public (Inter-module).

### sdk/dtos/
- **Purpose:** Contains Data Transfer Objects exclusively for SDK consumption to decouple internal database structures from consumers.
- **Parent:** sdk/
- **Children:** None.

### services/
- **Purpose:** Contains Execution and Query orchestration services. Execution services manage database transactions. Query services orchestrate complex reads.
- **Parent:** employee/
- **Children:** None.
- **Dependencies:** epositories/, PrismaService, PlatformSDK.
- **Public/Internal:** Internal.
