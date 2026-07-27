# Backend Architecture Walkthrough - ERP VV Infratech

Welcome to the backend architecture walkthrough. This document provides a high-level summary of the entire backend system, its core architectural principles, and the various business modules it supports.

## 1. Technology Stack

- **Framework:** NestJS (v10) - Provides a robust, modular, and scalable foundation.
- **Language:** TypeScript (v5) - For strong typing and better developer experience.
- **Database ORM:** Prisma (v6) - Type-safe database access.
- **Caching & Background Jobs:** Redis (via `ioredis` and `cache-manager`) and BullMQ for scalable background processing and event-driven tasks.
- **Authentication:** JWT (JSON Web Tokens) with Passport.js and bcrypt for secure password hashing.
- **Document Generation:** Puppeteer and Handlebars for generating PDFs and dynamic templates (e.g., payslips, offer letters).
- **Storage:** AWS S3 (`@aws-sdk/client-s3`) for file and document storage.

## 2. Architectural Principles

The backend is structured around a **Platform Governance Layer** approach with Domain-Driven Design (DDD) and Command Query Responsibility Segregation (CQRS) principles.

### Key Architectural Constraints:
- **Modular Monolith:** Features are highly segregated into business domains (`src/modules`) and platform capabilities (`src/core`).
- **SDK-Only Access:** Business modules do not directly interact with core database tables or external providers. They communicate through exposed `Platform SDKs` (e.g., `PlatformNotificationSDK`, `PlatformRuleSDK`), ensuring high decoupleability.
- **Event-Driven & Outbox Pattern:** Leverages an event bus and outbox pattern (`core/outbox`, `core/events`) for reliable asynchronous communication between modules.
- **Multi-Tenant Isolation:** Enforces logical isolation using organizational context (`core/context`) injected into requests.
- **Observability:** Built-in telemetry, metrics (`core/metrics`), health checks (Terminus), and standardized auditing (`core/audit`) across all endpoints.
- **Versioning Strategy:** Workflows, rules, and forms use an immutable versioning system (`DRAFT` -> `PUBLISHED`) to guarantee deterministic execution and auditability.

## 3. Core Platform Layer (`src/core`)

This layer provides cross-cutting infrastructural capabilities that all business modules utilize:

- **Security & Access:** `authentication`, `authorization`, `policy` (RBAC/ABAC).
- **Workflows & Rules:** `workflow`, `rules`, `approval` for defining and executing complex, multi-step business logic and approval chains.
- **Communication:** `notifications` (email via Nodemailer, SMS, etc.), `events`, `cqrs`.
- **System Utilities:** `cache`, `storage` (S3 integrations), `scheduler` (Cron jobs).
- **Data & UI Generation:** `forms` (dynamic form builder), `templates` (document templates).
- **Monitoring & Audit:** `audit`, `logger`, `metrics`, `health`, `monitoring`.
- **Advanced Capabilities:** `ai` (Artificial Intelligence), `search`, `feature-flags`.

## 4. Business Modules (`src/modules`)

These are the functional domains of the ERP system:

- **Organization:** Manages the hierarchical structure of the company, including branches, departments, locations, and roles.
- **Employee:** The core HR system of record containing employee profiles, personal details, documents, and employment history.
- **Attendance:** Time tracking, shift management, roasters, biometric punch integrations, and regularization requests.
- **Leave:** Manages leave policies, holiday calendars, accruals, leave requests, and balances.
- **Payroll:** Handles complex salary computations, tax deductions, compliance, and generation of payslips.
- **Performance:** Manages the employee review cycle, including appraisals, goals/OKRs, and continuous feedback.
- **Recruitment:** Applicant tracking system (ATS) for job postings, candidate pipelines, interview scheduling, and hiring workflows.
- **Expense:** Tracking expense claims, multi-level approval workflows, and reimbursements.
- **Assets:** Inventory and allocation of company assets (laptops, phones, equipment) to employees.
- **Offboarding:** Manages the separation process, including exit interviews, clearance workflows from different departments, and full & final (F&F) settlement.
- **ESS (Employee Self Service):** Dedicated portal endpoints for employees to view their payslips, apply for leaves, submit expenses, and manage personal data.
- **MSS (Manager Self Service):** Dedicated portal endpoints for managers to view team analytics, approve requests, and conduct performance reviews.

## Summary

The backend is a highly sophisticated, enterprise-grade NestJS application. It is built to be scalable and maintainable by strictly separating business logic (modules) from infrastructural concerns (core). The heavy emphasis on observability, auditability, event-driven patterns, and an SDK-based internal communication model ensures that it can support complex enterprise HRMS operations reliably.
