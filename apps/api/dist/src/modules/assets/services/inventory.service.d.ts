import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class InventoryService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    issueConsumable(ctx: PlatformContext, consumableId: string, employeeId: string, quantity: number, issuedBy: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        remarks: string | null;
        quantity: number;
        issuedAt: Date;
        issuedBy: string;
        consumableId: string;
    }>;
}
//# sourceMappingURL=inventory.service.d.ts.map