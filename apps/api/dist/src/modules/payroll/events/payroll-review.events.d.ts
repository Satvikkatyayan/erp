import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class PayrollReviewStartedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class PayrollReviewCompletedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class PayrollApprovedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string, workflowId?: string, workflowVersion?: number, stepNumber?: number, roleCode?: string, roleDisplayName?: string, reviewStatus?: string);
}
export declare class PayrollRejectedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string, workflowId?: string, workflowVersion?: number, stepNumber?: number, roleCode?: string, roleDisplayName?: string, reviewStatus?: string);
}
export declare class PayrollLockedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class PayrollProcessedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class PayrollCancelledEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class PayrollReopenedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string);
}
export declare class EmployeePayrollRegeneratedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    readonly employeeId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string, employeeId: string);
}
export declare class ReviewAssignmentCreatedEvent implements DomainEvent<any> {
    readonly ctx: PlatformContext;
    readonly runId: string;
    readonly reviewId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(ctx: PlatformContext, runId: string, reviewId: string);
}
//# sourceMappingURL=payroll-review.events.d.ts.map