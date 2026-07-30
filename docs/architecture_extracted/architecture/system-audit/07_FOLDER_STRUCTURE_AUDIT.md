# 07 FOLDER STRUCTURE AUDIT

## 1. Complete Project Folder Analysis
The `apps/api/src/modules/` directory strictly enforces the bounded context pattern. Every module follows the exact same internal directory topology, guaranteeing immediate familiarity for developers navigating across contexts.

## 2. Canonical Module Organization
```text
[module-name]/
├── api/
│   ├── dtos/                # Strict API validation contracts
│   ├── mappers/             # Domain-to-DTO and DTO-to-Domain translators
├── commands/
│   ├── handlers/            # Mutation orchestration
│   ├── [command-name].command.ts
├── queries/
│   ├── handlers/            # Read orchestration
│   ├── [query-name].query.ts
├── controllers/
│   ├── [module]-lifecycle.controller.ts  # Mutation endpoints
│   ├── [module]-query.controller.ts      # Read endpoints
├── services/
│   ├── [module]-execution.service.ts     # Core business logic and transactions
│   ├── [module]-query.service.ts         # Read optimization
├── repositories/                         # Prisma abstractions
├── sdk/
│   ├── platform-[module].sdk.ts          # Public anti-corruption layer
├── [module].module.ts                    # NestJS DI registration
```

## 3. Consistency and Boundaries
- **Consistency**: High. Employee, Attendance, Payroll, and Leave all perfectly adhere to this structure.
- **Boundaries**: Internal folders (e.g., `services/`, `repositories/`) are completely private to the module. Only the `sdk/` folder is exposed globally.
- **Naming**: File naming adheres to `kebab-case.suffix.ts`. Class naming adheres to `PascalCaseSuffix`.

## 4. Layer Organization Rules
- DTOs never bleed into Services. Mappers intercept them at the Controller layer.
- Repositories never bleed into Controllers. Services orchestrate them.
- SDKs never access Repositories. They access Query Services.

## 5. Recommendations for Future Modules
- The Recruitment, Communication, and File Management modules **MUST** replicate this exact folder structure.
- Even if a module is "simple" (e.g., File Management might just be CRUD over S3), the CQRS segregation (Commands vs Queries) and SDK folder must be instantiated to maintain the Enterprise architectural signature.
