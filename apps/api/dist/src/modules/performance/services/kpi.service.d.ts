import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
export declare class KpiService {
    private readonly prisma;
    private readonly sdk;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK);
    createKPI(ctx: any, data: {
        name: string;
        code: string;
        unit: string;
        targetValue?: number;
    }): Promise<any>;
    assignKPI(ctx: any, data: {
        kpiId: string;
        employeeId: string;
        cycleId: string;
        targetValue: number;
    }): Promise<any>;
    recordResult(ctx: any, assignmentId: string, actualValue: number): Promise<any>;
}
//# sourceMappingURL=kpi.service.d.ts.map