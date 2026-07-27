export class ReopenAttendanceCommand {
  constructor(
    public readonly musterId: string,
    public readonly actorId: string,
    public readonly actorRoles: string[],
    public readonly correlationId: string,
    public readonly reason?: string
  ) {}
}
