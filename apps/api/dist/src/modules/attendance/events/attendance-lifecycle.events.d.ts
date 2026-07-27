import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
export declare class AttendanceLifecycleEvent implements DomainEvent {
    readonly eventName: string;
    readonly correlationId: string;
    readonly payload: {
        musterId: string;
        actorId: string;
        fromState: string;
        toState: string;
        reason?: string;
    };
    readonly eventId: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(eventName: string, correlationId: string, payload: {
        musterId: string;
        actorId: string;
        fromState: string;
        toState: string;
        reason?: string;
    });
}
//# sourceMappingURL=attendance-lifecycle.events.d.ts.map