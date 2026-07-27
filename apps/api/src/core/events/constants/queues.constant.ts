export const QUEUES = {
  WORKFLOW: 'workflow',
  NOTIFICATION: 'notification',
  REPORT: 'report',
  SEARCH: 'search',
  INTEGRATION: 'integration',
  DOCUMENT: 'document',
  AUDIT: 'audit',
  SCHEDULER: 'scheduler',
} as const;

export const EVENT_ROUTING = {
  // Mapping Event Names to Target Queues
  // For example: 'LeaveApproved' -> [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT]
  'LeaveApproved': [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT],
  'EmployeeCreated': [QUEUES.WORKFLOW, QUEUES.NOTIFICATION, QUEUES.AUDIT, QUEUES.SEARCH],
};