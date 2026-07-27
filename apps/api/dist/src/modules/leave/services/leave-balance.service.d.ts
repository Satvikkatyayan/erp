import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class LeaveBalanceService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    bookLeaveTransaction(ctx: PlatformContext, employeeId: string, leaveTypeId: string, transactionType: string, units: number, referenceId?: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        leaveTypeId: string;
        totalAccrued: number;
        totalConsumed: number;
        currentBalance: number;
        lastCalculated: Date;
    }>;
    allocateEntitlement(ctx: PlatformContext, employeeId: string, leaveTypeId: string, units: number, validFrom: Date, validTo?: Date): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        leaveTypeId: string;
        entitledUnits: number;
        validFrom: Date;
        validTo: Date | null;
    }>;
}
//# sourceMappingURL=leave-balance.service.d.ts.map