# 03 ENTERPRISE SERVICE MAP

This document tracks all existing and planned core enterprise platform services that abstract away infrastructure and cross-cutting concerns from business modules.

---

## 1. Authentication Service
- **Purpose**: Manage identity verification, issue JWTs, handle login/logout flows.
- **Ownership**: Core Platform.
- **Consumers**: API Gateway, Global Guards.
- **Interfaces**: `JwtAuthGuard`, `AuthService`.
- **Dependencies**: Redis (Session storage).

## 2. Authorization Service
- **Purpose**: Enforce Role-Based and Attribute-Based Access Control (RBAC/ABAC).
- **Ownership**: Core Platform.
- **Consumers**: All business controllers.
- **Interfaces**: `@RequirePermissions`, `PermissionGuard`.
- **Dependencies**: Cache/Database for role resolution.

## 3. Workflow Service (Rules Engine)
- **Purpose**: Centralized evaluation of business rules and approval matrices.
- **Ownership**: Platform Engine.
- **Consumers**: Leave (Approvals), Payroll (Tax Rules).
- **Interfaces**: `PlatformRuleSDK`.
- **Dependencies**: None.

## 4. Audit Service
- **Purpose**: Standardized dual-write pattern for Timeline and Snapshot records.
- **Ownership**: Platform (Conceptually enforced, implemented locally per module).
- **Consumers**: All Execution Services.
- **Interfaces**: Module-specific Snapshot/Timeline repositories.
- **Dependencies**: Module databases.

## 5. Notification & Communication Service (Future)
- **Purpose**: Omni-channel message delivery (Email, SMS, Push, In-App).
- **Ownership**: Core Platform.
- **Consumers**: Recruitment (Offer Letters), Leave (Approval requests), Payroll (Payslips).
- **Interfaces**: `PlatformCommunicationSDK.send(payload)`.
- **Dependencies**: SES, Twilio, Redis queues.

## 6. Enterprise File Management Service (Future)
- **Purpose**: Secure attachment and document lifecycle management.
- **Ownership**: Core Platform.
- **Consumers**: Recruitment (Resumes), Employee (ID Documents).
- **Interfaces**: `PlatformFileManagementSDK.upload()`, `PlatformFileManagementSDK.generatePresignedUrl()`.
- **Dependencies**: AWS S3 (or equivalent blob storage).

## 7. Logging and Telemetry Service
- **Purpose**: Centralize request tracing, metrics, and error reporting.
- **Ownership**: Core Platform.
- **Consumers**: Global Interceptors, Error Filters.
- **Interfaces**: Datadog/Prometheus exporters, Pino Logger.
- **Dependencies**: OpenTelemetry.
