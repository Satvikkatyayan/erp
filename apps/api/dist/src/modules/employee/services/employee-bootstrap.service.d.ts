import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EmployeeBootstrapService {
    private readonly prisma;
    private readonly sdk;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    provisionDownstreamProfiles(ctx: PlatformContext, employeeId: string): Promise<void>;
}
//# sourceMappingURL=employee-bootstrap.service.d.ts.map