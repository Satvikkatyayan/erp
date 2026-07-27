import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class RecruitmentValidationService {
    private readonly prisma;
    private readonly sdk;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    validateNewCandidate(ctx: PlatformContext, payload: any): Promise<void>;
    validateHeadcount(ctx: PlatformContext, positionId: string): Promise<void>;
}
//# sourceMappingURL=recruitment-validation.service.d.ts.map