import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeTimelineRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
        id: string;
        actorId: string | null;
        timestamp: Date;
        reason: string | null;
        attendanceDayId: string;
        fieldChanged: string;
        previousValue: string | null;
        currentValue: string | null;
    }>;
}
//# sourceMappingURL=employee-timeline.repository.d.ts.map