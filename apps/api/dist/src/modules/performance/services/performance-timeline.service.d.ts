import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PerformanceTimelineService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    recordEvent(ctx: any, cycleId: string | null, employeeId: string | null, eventType: string, eventData?: any): Promise<void>;
}
//# sourceMappingURL=performance-timeline.service.d.ts.map