export class ScheduleCreatedEvent {
  constructor(
    public readonly correlationId: string,
    public readonly scheduleId: string,
    public readonly tenantId: string,
    public readonly releaseAt: Date
  ) {
    Object.freeze(this);
  }
}
