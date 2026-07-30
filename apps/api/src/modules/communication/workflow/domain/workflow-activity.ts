export class WorkflowActivity {
  constructor(
    public readonly activityId: string,
    public readonly workflowId: string,
    public readonly activityType: string,
    public readonly payload: any
  ) {
    Object.freeze(this);
  }
}
