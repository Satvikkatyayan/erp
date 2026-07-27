export interface WorkflowCompletedEvent {
    workflowId: string;
    status: "APPROVED" | "REJECTED";
    completedAt: string;
}
//# sourceMappingURL=workflow.events.d.ts.map