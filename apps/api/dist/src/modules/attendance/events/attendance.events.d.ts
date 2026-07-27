import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
export declare class DailyMusterCreatedEvent implements DomainEvent {
    readonly correlationId: string;
    readonly payload: {
        musterId: string;
        siteId: string;
        date: Date;
        createdBy: string;
    };
    readonly eventId: string;
    readonly eventName: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(correlationId: string, payload: {
        musterId: string;
        siteId: string;
        date: Date;
        createdBy: string;
    });
}
export declare class AttendanceSnapshotCreatedEvent implements DomainEvent {
    readonly correlationId: string;
    readonly payload: {
        snapshotId: string;
        musterId: string;
        siteId: string;
        employeeCount: number;
    };
    readonly eventId: string;
    readonly eventName: string;
    readonly version: number;
    readonly timestamp: Date;
    constructor(correlationId: string, payload: {
        snapshotId: string;
        musterId: string;
        siteId: string;
        employeeCount: number;
    });
}
//# sourceMappingURL=attendance.events.d.ts.map