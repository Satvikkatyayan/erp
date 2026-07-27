import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
export declare class AttendanceReviewEvent implements DomainEvent {
    readonly eventName: string;
    readonly correlationId: string;
    readonly payload: {
        musterId: string;
        reviewerId?: string;
        role?: string;
        decision?: string;
        remarks?: string;
    };
    readonly eventId: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(eventName: string, correlationId: string, payload: {
        musterId: string;
        reviewerId?: string;
        role?: string;
        decision?: string;
        remarks?: string;
    });
}
//# sourceMappingURL=attendance-review.events.d.ts.map