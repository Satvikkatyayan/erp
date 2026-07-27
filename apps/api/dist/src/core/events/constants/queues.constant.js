"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENT_ROUTING = exports.QUEUES = void 0;
exports.QUEUES = {
    WORKFLOW: 'workflow',
    NOTIFICATION: 'notification',
    REPORT: 'report',
    SEARCH: 'search',
    INTEGRATION: 'integration',
    DOCUMENT: 'document',
    AUDIT: 'audit',
    SCHEDULER: 'scheduler',
};
exports.EVENT_ROUTING = {
    'LeaveApproved': [exports.QUEUES.WORKFLOW, exports.QUEUES.NOTIFICATION, exports.QUEUES.AUDIT],
    'EmployeeCreated': [exports.QUEUES.WORKFLOW, exports.QUEUES.NOTIFICATION, exports.QUEUES.AUDIT, exports.QUEUES.SEARCH],
};
//# sourceMappingURL=queues.constant.js.map