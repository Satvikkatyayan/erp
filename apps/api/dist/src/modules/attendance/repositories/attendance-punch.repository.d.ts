import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class AttendancePunchRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        sessionId: string;
        source: import(".prisma/client").$Enums.PunchSource;
        createdAt: Date;
        timestamp: Date;
        punchType: import(".prisma/client").$Enums.PunchType;
    }>;
}
//# sourceMappingURL=attendance-punch.repository.d.ts.map