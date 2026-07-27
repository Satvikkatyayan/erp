import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class MusterTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        version: number;
        musterId: string;
        action: string;
        actorId: string | null;
        timestamp: Date;
        reason: string | null;
        previousState: string | null;
        currentState: string | null;
        severity: string | null;
    }>;
}
//# sourceMappingURL=muster-timeline.repository.d.ts.map