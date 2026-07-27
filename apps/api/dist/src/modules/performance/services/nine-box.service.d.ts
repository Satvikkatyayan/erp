import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class NineBoxService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    assessPotential(ctx: any, data: {
        employeeId: string;
        cycleId: string;
        potentialScore: number;
    }): Promise<any>;
    calculatePlacement(ctx: any, cycleId: string, employeeId: string): Promise<any>;
    getMatrix(tenantId: string, cycleId: string): Promise<any[]>;
    private computeBoxLabel;
}
//# sourceMappingURL=nine-box.service.d.ts.map