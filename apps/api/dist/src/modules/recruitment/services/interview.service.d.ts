import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class InterviewService {
    private readonly prisma;
    private readonly sdk;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    submitFeedback(ctx: PlatformContext, interviewId: string, formPayload: any): Promise<void>;
}
//# sourceMappingURL=interview.service.d.ts.map