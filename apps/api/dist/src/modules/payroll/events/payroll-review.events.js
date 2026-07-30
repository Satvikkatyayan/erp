"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAssignmentCreatedEvent = exports.EmployeePayrollRegeneratedEvent = exports.PayrollReopenedEvent = exports.PayrollCancelledEvent = exports.PayrollProcessedEvent = exports.PayrollLockedEvent = exports.PayrollRejectedEvent = exports.PayrollApprovedEvent = exports.PayrollReviewCompletedEvent = exports.PayrollReviewStartedEvent = void 0;
const uuid_1 = require("uuid");
class PayrollReviewStartedEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollReviewStartedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollReviewStartedEvent = PayrollReviewStartedEvent;
class PayrollReviewCompletedEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollReviewCompletedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollReviewCompletedEvent = PayrollReviewCompletedEvent;
class PayrollApprovedEvent {
    constructor(ctx, runId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollApprovedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus };
    }
}
exports.PayrollApprovedEvent = PayrollApprovedEvent;
class PayrollRejectedEvent {
    constructor(ctx, runId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollRejectedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId, workflowId, workflowVersion, stepNumber, roleCode, roleDisplayName, reviewStatus };
    }
}
exports.PayrollRejectedEvent = PayrollRejectedEvent;
class PayrollLockedEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollLockedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollLockedEvent = PayrollLockedEvent;
class PayrollProcessedEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollProcessedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollProcessedEvent = PayrollProcessedEvent;
class PayrollCancelledEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollCancelledEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollCancelledEvent = PayrollCancelledEvent;
class PayrollReopenedEvent {
    constructor(ctx, runId) {
        this.ctx = ctx;
        this.runId = runId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'PayrollReopenedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, tenantId: ctx.tenantId };
    }
}
exports.PayrollReopenedEvent = PayrollReopenedEvent;
class EmployeePayrollRegeneratedEvent {
    constructor(ctx, runId, employeeId) {
        this.ctx = ctx;
        this.runId = runId;
        this.employeeId = employeeId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'EmployeePayrollRegeneratedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, employeeId, tenantId: ctx.tenantId };
    }
}
exports.EmployeePayrollRegeneratedEvent = EmployeePayrollRegeneratedEvent;
class ReviewAssignmentCreatedEvent {
    constructor(ctx, runId, reviewId) {
        this.ctx = ctx;
        this.runId = runId;
        this.reviewId = reviewId;
        this.eventId = (0, uuid_1.v4)();
        this.eventName = 'ReviewAssignmentCreatedEvent';
        this.timestamp = new Date();
        this.version = 1;
        this.payload = { runId, reviewId, tenantId: ctx.tenantId };
    }
}
exports.ReviewAssignmentCreatedEvent = ReviewAssignmentCreatedEvent;
//# sourceMappingURL=payroll-review.events.js.map