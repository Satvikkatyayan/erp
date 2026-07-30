export interface TraceContext {
    correlationId: string;
}
export declare class TraceContextService {
    private readonly als;
    runWithContext<T>(context: TraceContext, fn: () => T): T;
    getCorrelationId(): string | undefined;
}
//# sourceMappingURL=trace-context.service.d.ts.map