export class ScheduleCancelledEvent {
  constructor(
    public readonly correlationId: string,
    public readonly scheduleId: string,
    public readonly tenantId: string,
    public readonly reason: string
  ) {
    Object.freeze(this);
  }
}
