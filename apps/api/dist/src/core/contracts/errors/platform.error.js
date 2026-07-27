"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowError = exports.AuthorizationError = exports.ValidationError = exports.PlatformError = void 0;
class PlatformError extends Error {
    constructor(code, message, correlationId, isRecoverable, context) {
        super(message);
        this.code = code;
        this.message = message;
        this.correlationId = correlationId;
        this.isRecoverable = isRecoverable;
        this.context = context;
        this.name = this.constructor.name;
    }
}
exports.PlatformError = PlatformError;
class ValidationError extends PlatformError {
    constructor(message, correlationId, context) {
        super('ERR_VALIDATION', message, correlationId, false, context);
    }
}
exports.ValidationError = ValidationError;
class AuthorizationError extends PlatformError {
    constructor(message, correlationId, context) {
        super('ERR_UNAUTHORIZED', message, correlationId, false, context);
    }
}
exports.AuthorizationError = AuthorizationError;
class WorkflowError extends PlatformError {
    constructor(message, correlationId, context) {
        super('ERR_WORKFLOW', message, correlationId, false, context);
    }
}
exports.WorkflowError = WorkflowError;
//# sourceMappingURL=platform.error.js.map