import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class LeaveTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTimelineEntry(tenantId: string, leaveRequestId: string, action: string, performedBy: string, data?: any, tx?: any): Promise<any>;
    getTimeline(tenantId: string, leaveRequestId: string): Promise<any[]>;
}
//# sourceMappingURL=timeline.repository.d.ts.map