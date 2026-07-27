import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class ExitTimelineService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logEvent(requestId: string, event: string, actorId: string, description?: string): Promise<void>;
}
//# sourceMappingURL=exit-timeline.service.d.ts.map