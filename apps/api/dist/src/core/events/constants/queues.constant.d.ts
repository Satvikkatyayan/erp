export declare const QUEUES: {
    readonly WORKFLOW: "workflow";
    readonly NOTIFICATION: "notification";
    readonly REPORT: "report";
    readonly SEARCH: "search";
    readonly INTEGRATION: "integration";
    readonly DOCUMENT: "document";
    readonly AUDIT: "audit";
    readonly SCHEDULER: "scheduler";
};
export declare const EVENT_ROUTING: {
    LeaveApproved: ("workflow" | "notification" | "audit")[];
    EmployeeCreated: ("workflow" | "notification" | "search" | "audit")[];
};
//# sourceMappingURL=queues.constant.d.ts.map