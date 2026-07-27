import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendanceSessionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        attendanceDayId: string;
        sessionStart: Date | null;
        sessionEnd: Date | null;
    }>;
}
//# sourceMappingURL=attendance-session.repository.d.ts.map