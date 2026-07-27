import { AttendanceReviewStatus } from '@prisma/client';
export declare class CompleteReviewCommand {
    readonly musterId: string;
    readonly actorId: string;
    readonly actorRoles: string[];
    readonly decision: AttendanceReviewStatus;
    readonly remarks: string;
    readonly correlationId: string;
    constructor(musterId: string, actorId: string, actorRoles: string[], decision: AttendanceReviewStatus, remarks: string, correlationId: string);
}
//# sourceMappingURL=complete-review.command.d.ts.map