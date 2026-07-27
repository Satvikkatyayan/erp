import { PrismaService } from '../../../common/prisma/prisma.service';
export interface SnapshotEmployeeData {
    employeeId: string;
    employeeCode: string;
    firstName: string;
    lastName: string;
    designationId: string | null;
    designationName: string | null;
    departmentId: string | null;
    departmentName: string | null;
    reportingManagerId: string | null;
}
export declare class AttendanceSnapshotService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSnapshot(musterId: string, siteId: string, projectId: string, date: Date, prismaTx?: any): Promise<any>;
    loadSnapshot(snapshotId: string): Promise<{
        id: string;
        musterId: string;
        siteId: string;
        projectId: string;
        capturedAt: Date;
        snapshotData: import("@prisma/client/runtime/library").JsonValue;
    }>;
    validateSnapshot(snapshotId: string): Promise<boolean>;
}
//# sourceMappingURL=attendance-snapshot.service.d.ts.map