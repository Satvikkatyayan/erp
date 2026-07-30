import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class CommunicationTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTimelineEntry(tenantId: string, historyId: string, action: string, data: any, tx?: any): Promise<any>;
}
//# sourceMappingURL=communication-timeline.repository.d.ts.map