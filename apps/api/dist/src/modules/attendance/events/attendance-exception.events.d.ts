import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
export declare class AttendanceExceptionEvent implements DomainEvent {
    readonly eventName: string;
    readonly correlationId: string;
    readonly payload: {
        exceptionId: string;
        musterId: string;
        type: string;
        severity: string;
        actorId?: string;
    };
    readonly eventId: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(eventName: string, correlationId: string, payload: {
        exceptionId: string;
        musterId: string;
        type: string;
        severity: string;
        actorId?: string;
    });
}
export declare class AttendanceHealthEvent implements DomainEvent {
    readonly eventName: string;
    readonly correlationId: string;
    readonly payload: {
        musterId: string;
        siteId: string;
        completionPercentage: number;
        pendingExceptions: number;
    };
    readonly eventId: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(eventName: string, correlationId: string, payload: {
        musterId: string;
        siteId: string;
        completionPercentage: number;
        pendingExceptions: number;
    });
}
//# sourceMappingURL=attendance-exception.events.d.ts.map