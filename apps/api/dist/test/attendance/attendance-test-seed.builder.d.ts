import { PrismaService } from '../../src/common/prisma/prisma.service';
export declare class AttendanceTestSeedBuilder {
    private readonly prisma;
    constructor(prisma: PrismaService);
    cleanDatabase(): Promise<void>;
    buildEnterprise(): Promise<{
        orgId: string;
        branchId: string;
        projectId: string;
        siteId: string;
    }>;
    buildEmployees(branchId: string, siteId: string): Promise<{
        employeeId: string;
        managerId: string;
        hrId: string;
    }>;
    buildPayrollPeriod(): Promise<{
        periodId: string;
    }>;
}
//# sourceMappingURL=attendance-test-seed.builder.d.ts.map