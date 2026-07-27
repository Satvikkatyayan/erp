export interface WorkflowCompletedEvent {
  workflowId: string;
  status: "APPROVED" | "REJECTED";
  completedAt: string;
}