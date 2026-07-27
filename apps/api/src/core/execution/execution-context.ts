import { IExecutionContext } from './interfaces/IExecutionContext';

export class ExecutionContext implements IExecutionContext {
  constructor(
    public readonly tenantId: string,
    public readonly organizationId: string,
    public readonly correlationId: string,
    public readonly occurredAt: Date,
    public readonly retryCount: number,
    public readonly causationId?: string,
    public readonly userId?: string,
    public readonly requestId?: string,
    public readonly metadata?: Record<string, any>,
  ) {}
}
