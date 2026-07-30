export class ScheduleReleasedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly scheduleId: string,
    public readonly scheduleReleaseId: string,
    public readonly tenantId: string
  ) {
    Object.freeze(this);
  }
}
