import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class MssEventListener {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    handleApprovalRequested(ctx: PlatformContext, payload: any): Promise<void>;
}
//# sourceMappingURL=mss-event.listener.d.ts.map