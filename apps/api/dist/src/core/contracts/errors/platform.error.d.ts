export declare abstract class PlatformError extends Error {
    readonly code: string;
    readonly message: string;
    readonly correlationId: string;
    readonly isRecoverable: boolean;
    readonly context?: any;
    constructor(code: string, message: string, correlationId: string, isRecoverable: boolean, context?: any);
}
export declare class ValidationError extends PlatformError {
    constructor(message: string, correlationId: string, context?: any);
}
export declare class AuthorizationError extends PlatformError {
    constructor(message: string, correlationId: string, context?: any);
}
export declare class WorkflowError extends PlatformError {
    constructor(message: string, correlationId: string, context?: any);
}
//# sourceMappingURL=platform.error.d.ts.map