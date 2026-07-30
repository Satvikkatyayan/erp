"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WelcomeMailRequestedEvent = exports.EmployeeSnapshotCreatedEvent = exports.EmployeeTimelineCreatedEvent = exports.EmployeeProbationStartedEvent = exports.EmployeeResignedEvent = exports.EmployeeTerminatedEvent = exports.EmployeeRehiredEvent = exports.EmployeeExitedEvent = exports.EmployeePromotedEvent = exports.EmployeeTransferredEvent = exports.EmployeeConfirmedEvent = exports.EmployeeJoinedEvent = exports.EmployeeCreatedEvent = void 0;
const uuid_1 = require("uuid");
class EmployeeCreatedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeCreatedEvent = EmployeeCreatedEvent;
class EmployeeJoinedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeJoinedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeJoinedEvent = EmployeeJoinedEvent;
class EmployeeConfirmedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeConfirmedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeConfirmedEvent = EmployeeConfirmedEvent;
class EmployeeTransferredEvent {
    constructor(employeeId, tenantId, newJobAssignmentId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.newJobAssignmentId = newJobAssignmentId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeTransferredEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId, newJobAssignmentId };
    }
}
exports.EmployeeTransferredEvent = EmployeeTransferredEvent;
class EmployeePromotedEvent {
    constructor(employeeId, tenantId, newPositionId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.newPositionId = newPositionId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeePromotedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId, newPositionId };
    }
}
exports.EmployeePromotedEvent = EmployeePromotedEvent;
class EmployeeExitedEvent {
    constructor(employeeId, tenantId, exitDate) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.exitDate = exitDate;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeExitedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId, exitDate };
    }
}
exports.EmployeeExitedEvent = EmployeeExitedEvent;
class EmployeeRehiredEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeRehiredEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeRehiredEvent = EmployeeRehiredEvent;
class EmployeeTerminatedEvent {
    constructor(employeeId, tenantId, terminationDate) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.terminationDate = terminationDate;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeTerminatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId, terminationDate };
    }
}
exports.EmployeeTerminatedEvent = EmployeeTerminatedEvent;
class EmployeeResignedEvent {
    constructor(employeeId, tenantId, resignationDate) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.resignationDate = resignationDate;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeResignedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId, resignationDate };
    }
}
exports.EmployeeResignedEvent = EmployeeResignedEvent;
class EmployeeProbationStartedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeProbationStartedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeProbationStartedEvent = EmployeeProbationStartedEvent;
class EmployeeTimelineCreatedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeTimelineCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeTimelineCreatedEvent = EmployeeTimelineCreatedEvent;
class EmployeeSnapshotCreatedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeeSnapshotCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.EmployeeSnapshotCreatedEvent = EmployeeSnapshotCreatedEvent;
class WelcomeMailRequestedEvent {
    constructor(employeeId, tenantId) {
        this.employeeId = employeeId;
        this.tenantId = tenantId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'WelcomeMailRequestedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { employeeId, tenantId };
    }
}
exports.WelcomeMailRequestedEvent = WelcomeMailRequestedEvent;
//# sourceMappingURL=employee.events.js.map