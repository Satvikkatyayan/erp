import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class PayrollQueryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getLatestPayslip(ctx: PlatformContext): Promise<{
        payrollCycle: {
            name: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            version: number;
            startDate: Date;
            endDate: Date;
            deletedAt: Date | null;
            createdBy: string | null;
            updatedBy: string | null;
            isClosed: boolean;
        };
    } & {
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        payrollCycleId: string;
        netPay: import("@prisma/client/runtime/library").Decimal;
    }>;
    getPayslips(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        version: number;
        deletedAt: Date | null;
        createdBy: string | null;
        updatedBy: string | null;
        payrollCycleId: string;
        netPay: import("@prisma/client/runtime/library").Decimal;
    }[]>;
}
//# sourceMappingURL=payroll-query.service.d.ts.map