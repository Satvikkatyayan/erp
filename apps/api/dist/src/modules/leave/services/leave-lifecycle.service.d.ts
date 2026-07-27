import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { LeaveBalanceService } from './leave-balance.service';
export declare class LeaveLifecycleService {
    private readonly prisma;
    private readonly sdk;
    private readonly balanceService;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, balanceService: LeaveBalanceService);
    requestLeave(ctx: PlatformContext, employeeId: string, leaveTypeId: string, startDate: Date, endDate: Date, units: number, reason: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        workflowId: string | null;
        reason: string;
        startDate: Date;
        endDate: Date;
        leaveTypeId: string;
        leaveUnits: number;
    }>;
    approveLeave(ctx: PlatformContext, requestId: string, approverId: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        status: string;
        workflowId: string | null;
        reason: string;
        startDate: Date;
        endDate: Date;
        leaveTypeId: string;
        leaveUnits: number;
    }>;
}
//# sourceMappingURL=leave-lifecycle.service.d.ts.map