import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class OrganizationBootstrapService {
    private readonly prisma;
    private readonly platform;
    private readonly logger;
    constructor(prisma: PrismaService, platform: PlatformSDK);
    bootstrapNewOrganization(ctx: PlatformContext, orgId: string): Promise<any>;
}
//# sourceMappingURL=organization-bootstrap.service.d.ts.map