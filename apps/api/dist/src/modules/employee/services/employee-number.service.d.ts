import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EmployeeNumberService {
    private readonly prisma;
    private readonly sdk;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    generate(ctx: PlatformContext, policyName: string): Promise<string>;
}
//# sourceMappingURL=employee-number.service.d.ts.map