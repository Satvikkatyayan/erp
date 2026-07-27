export interface QueryResult<T = any> {
    data: T;
    isStale?: boolean;
    metadata?: any;
}
export interface CommandResult<T = any> {
    success: boolean;
    id?: string;
    data?: T;
    error?: string;
}
export interface ProjectionMetadata {
    projectionId: string;
    projectionType: string;
    version: number;
    lastEventId: string;
    lastSequenceNumber: number;
    generatedAt: Date;
}
//# sourceMappingURL=cqrs.contracts.d.ts.map