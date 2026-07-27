import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class LeaveCarryForwardService {
    private readonly prisma;
    private readonly sdk;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    processYearEnd(ctx: PlatformContext, employeeId: string, leaveTypeId: string): Promise<void>;
}
//# sourceMappingURL=leave-carry-forward.service.d.ts.map