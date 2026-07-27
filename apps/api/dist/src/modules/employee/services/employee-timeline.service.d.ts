import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeTimelineService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    logEvent(employeeId: string, eventType: string, description: string, metadata?: any): Promise<{
        metadata: import("@prisma/client/runtime/library").JsonValue | null;
        id: string;
        employeeId: string;
        description: string;
        eventType: string;
        eventDate: Date;
    }>;
}
//# sourceMappingURL=employee-timeline.service.d.ts.map