import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { LeaveBalanceService } from './leave-balance.service';
export declare class LeavePolicyService {
    private readonly prisma;
    private readonly sdk;
    private readonly balanceService;
    constructor(prisma: PrismaService, sdk: PlatformSDK, balanceService: LeaveBalanceService);
    assignPolicy(ctx: PlatformContext, employeeId: string, leavePolicyId: string, effectiveFrom: Date): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        leavePolicyId: string;
    }>;
    applyProbationTransition(ctx: PlatformContext, employeeId: string, plTypeId: string, clTypeId: string): Promise<void>;
}
//# sourceMappingURL=leave-policy.service.d.ts.map