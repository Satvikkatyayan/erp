import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmpEmployeeTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createTimelineEntry(tenantId: string, employeeId: string, eventType: string, eventData: any, tx?: any): Promise<any>;
    getTimeline(tenantId: string, employeeId: string): Promise<any[]>;
}
//# sourceMappingURL=timeline.repository.d.ts.map