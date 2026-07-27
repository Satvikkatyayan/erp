# Platform Governance Layer Rules

All current and future engines/modules within the Enterprise HRMS Platform must strictly adhere to the following architectural constraints:

## 1. Consistent Versioning Strategy
- Configurations that alter business logic (Workflows, Rules, Calendars, Forms, Templates) must use immutable versions.
- Modifications create new versions (`DRAFT` -> `PUBLISHED`); existing instances bind strictly to the version active at their inception to guarantee deterministic execution and auditability.

## 2. Audit and Explainability
- Complex decisions must leave an execution trace (e.g., `RuleExecutionStep`, `WorkflowSnapshot`).
- Every engine must support a `/simulate` endpoint capable of returning dry-run explainability traces without mutating the database.

## 3. Metrics and Health Endpoints
- Every engine must expose health checks (`/health`, `/live`, `/ready`) adhering to the Terminus pattern.
- Caching logic and high-throughput evaluations must increment Prometheus/Grafana friendly telemetry (e.g., execution latency, cache hits/misses).

## 4. Feature Flag Support
- Module functionality must be gated by the Platform Feature Flag service, allowing incremental rollout and runtime toggles.

## 5. Multi-Tenant Isolation
- Queries must enforce logical isolation by Organization (`organizationId`) or Branch/Entity via the Request Context.

## 6. Policy Enforcement
- Actions must pass through the central Authorization engine (RBAC/ABAC).

## 7. SDK-Only Access
- Business modules (e.g., Payroll, Leave, Recruitment) must NEVER query core engine repositories (Prisma) or providers directly.
- Business modules may only consume logic via exposed `Platform*SDK` providers (e.g., `PlatformNotificationSDK.send()`, `PlatformRuleSDK.evaluate()`).

## 8. Platform Observability Standard
Every service and engine must natively support deep observability:
- **Endpoints**: `/health`, `/metrics`, `/ready`, `/live`.
- **Telemetry Publishing**: Automatically track and publish execution duration, cache hits/misses, and queue depth.
- **Audit Trails**: All state mutations and complex decisions must publish `AuditEvents`.
- **Traceability**: Implement ubiquitous Correlation IDs and causation tracking.
- **OpenTelemetry Context**: Maintain context propagation (or an equivalent abstraction) to prepare for distributed tracing tools (Jaeger, Datadog) without refactoring logic.

## 9. Platform Telemetry Contract
Every engine and module must adhere to a standardized telemetry contract, exposing the following core metrics to guarantee seamless integration with Reporting and Monitoring systems (Prometheus/Grafana):
- **Request Count**: Total invocations grouped by status code and module.
- **Error Count**: Granular error tracking grouped by error type/class.
- **Latency**: Execution duration for API boundaries and complex internal evaluations.
- **Queue Depth**: Backlog size for all asynchronous background workers (e.g. BullMQ).
- **Cache Hit Ratio**: Effectiveness of memory and Redis caching layers.
- **Worker Status**: Health state (Idle, Active, Stalled) for distributed consumers.
- **Health State**: Aggregate system dependency status (DB, Redis, S3).
- **Version**: Active module/engine version deployed.
- **Correlation ID Propagation**: Unbroken request tracing from Gateway -> SDK -> Engine -> Provider.
