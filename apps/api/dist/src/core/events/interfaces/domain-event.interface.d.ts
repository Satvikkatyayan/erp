export interface DomainEvent<T = any> {
    eventId: string;
    eventName: string;
    payload: T;
    timestamp: Date;
    correlationId?: string;
    causationId?: string;
    metadata?: Record<string, any>;
    version: number;
}
//# sourceMappingURL=domain-event.interface.d.ts.map