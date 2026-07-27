import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class ExitPolicyResolver {
    private readonly prisma;
    constructor(prisma: PrismaService);
    resolvePolicy(ctx: PlatformContext, policyId: string): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        policyName: string;
        noticePeriodDays: number;
        slaConfig: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
//# sourceMappingURL=exit-policy.resolver.d.ts.map