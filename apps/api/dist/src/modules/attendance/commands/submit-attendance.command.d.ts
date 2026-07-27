export declare class SubmitAttendanceCommand {
    readonly musterId: string;
    readonly actorId: string;
    readonly actorRoles: string[];
    readonly correlationId: string;
    readonly reason?: string;
    constructor(musterId: string, actorId: string, actorRoles: string[], correlationId: string, reason?: string);
}
//# sourceMappingURL=submit-attendance.command.d.ts.map