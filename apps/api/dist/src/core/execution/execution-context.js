"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionContext = void 0;
class ExecutionContext {
    constructor(tenantId, organizationId, correlationId, occurredAt, retryCount, causationId, userId, requestId, metadata) {
        this.tenantId = tenantId;
        this.organizationId = organizationId;
        this.correlationId = correlationId;
        this.occurredAt = occurredAt;
        this.retryCount = retryCount;
        this.causationId = causationId;
        this.userId = userId;
        this.requestId = requestId;
        this.metadata = metadata;
    }
}
exports.ExecutionContext = ExecutionContext;
//# sourceMappingURL=execution-context.js.map