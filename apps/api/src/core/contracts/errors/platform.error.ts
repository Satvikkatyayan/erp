export abstract class PlatformError extends Error {
  constructor(
    public readonly code: string,
    public readonly message: string,
    public readonly correlationId: string,
    public readonly isRecoverable: boolean,
    public readonly context?: any
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class ValidationError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_VALIDATION', message, correlationId, false, context);
  }
}

export class AuthorizationError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_UNAUTHORIZED', message, correlationId, false, context);
  }
}

export class WorkflowError extends PlatformError {
  constructor(message: string, correlationId: string, context?: any) {
    super('ERR_WORKFLOW', message, correlationId, false, context);
  }
}