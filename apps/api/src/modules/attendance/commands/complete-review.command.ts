import { AttendanceReviewStatus } from '@prisma/client';
export class CompleteReviewCommand {
  constructor(
    public readonly musterId: string,
    public readonly actorId: string,
    public readonly actorRoles: string[],
    public readonly decision: AttendanceReviewStatus,
    public readonly remarks: string,
    public readonly correlationId: string,
  ) {}
}
