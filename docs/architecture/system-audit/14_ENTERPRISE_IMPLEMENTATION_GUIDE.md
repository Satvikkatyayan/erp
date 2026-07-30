# 14 ENTERPRISE IMPLEMENTATION GUIDE

## 1. Purpose
This document serves as the implementation handbook for all future feature modules. When building a new module (e.g., Recruitment), follow these steps strictly.

## 2. Step-by-Step Implementation

### Step 1: Database Schema & Repositories
- Define Prisma models prefixed or grouped logically (e.g., `Candidate`, `Application`). Ensure all models include `tenantId`, `createdAt`, `updatedAt`.
- Create corresponding Timeline and Snapshot tables.
- Generate `PrismaClient`.
- Create a dedicated Repository class for each core entity. Inject `PrismaService`. Ensure all methods accept `tenantId` and enforce it in queries.

### Step 2: DTOs & Mappers
- Define Request DTOs in `api/dtos/requests.dto.ts`. Use `class-validator` (e.g., `@IsString()`, `@IsNotEmpty()`).
- Define Response DTOs in `api/dtos/responses.dto.ts`.
- Create a Mapper class in `api/mappers/` that contains a generic `success(data, message)` standard wrapper.

### Step 3: Commands & Queries
- Create Command classes holding `tenantId` and payload.
- Create Query classes holding `tenantId` and filters/IDs.

### Step 4: Services (CQRS)
- Create `[Module]ExecutionService`. Inject Repositories. Create methods wrapping `this.prisma.$transaction(...)`. Inside the transaction, mutate the core entity, create the Timeline, create the Snapshot, and return an `ExecutionResult(data, events)`.
- Create `[Module]QueryService`. Inject Repositories. Pass through read operations.

### Step 5: Handlers
- Create Handler classes. Inject the respective Service and the `PlatformEventPublisher`.
- Await service execution, then iterate and publish events.

### Step 6: Controllers
- Create Lifecycle and Query controllers.
- Apply `@UseGuards(JwtAuthGuard, PermissionGuard)`.
- Apply `@RequirePermissions('domain:action')`.
- Route HTTP payload to Command, invoke Handler, return via Mapper.

### Step 7: The SDK
- Create `Platform[Module]SDK` in `sdk/`. Inject `QueryService`.
- Map internal entity shapes to clean, strictly-typed public DTOs.

### Step 8: Module Registration
- Create `[Module].module.ts`. Register all the above in `controllers` and `providers`.
- Export ONLY the `Platform[Module]SDK`.

## 3. Review & Acceptance
- Run `npx tsc --noEmit` and `npm run build`.
- Verify no unresolved dependencies, circular dependencies, or architecture violations exist.
