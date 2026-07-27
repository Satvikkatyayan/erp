import { IExecutionContext } from './interfaces/IExecutionContext';
export declare class ExecutionContext implements IExecutionContext {
    readonly tenantId: string;
    readonly organizationId: string;
    readonly correlationId: string;
    readonly occurredAt: Date;
    readonly retryCount: number;
    readonly causationId?: string;
    readonly userId?: string;
    readonly requestId?: string;
    readonly metadata?: Record<string, any>;
    constructor(tenantId: string, organizationId: string, correlationId: string, occurredAt: Date, retryCount: number, causationId?: string, userId?: string, requestId?: string, metadata?: Record<string, any>);
}
//# sourceMappingURL=execution-context.d.ts.map