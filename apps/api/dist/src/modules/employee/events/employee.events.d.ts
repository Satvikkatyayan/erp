import { DomainEvent } from '../../../core/events/interfaces/domain-event.interface';
export declare class EmployeeCreatedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeJoinedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeConfirmedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeTransferredEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    readonly newJobAssignmentId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string, newJobAssignmentId: string);
}
export declare class EmployeePromotedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    readonly newPositionId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string, newPositionId: string);
}
export declare class EmployeeExitedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    readonly exitDate: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string, exitDate: string);
}
export declare class EmployeeRehiredEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeTerminatedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    readonly terminationDate: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string, terminationDate: string);
}
export declare class EmployeeResignedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    readonly resignationDate: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string, resignationDate: string);
}
export declare class EmployeeProbationStartedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeTimelineCreatedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class EmployeeSnapshotCreatedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
export declare class WelcomeMailRequestedEvent implements DomainEvent<any> {
    readonly employeeId: string;
    readonly tenantId: string;
    eventId: string;
    eventName: string;
    timestamp: Date;
    version: number;
    payload: any;
    constructor(employeeId: string, tenantId: string);
}
//# sourceMappingURL=employee.events.d.ts.map