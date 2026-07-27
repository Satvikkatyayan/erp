import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class ClearanceMatrixEngine {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateClearanceTasks(ctx: PlatformContext, requestId: string, templateId: string): Promise<void>;
}
//# sourceMappingURL=clearance-matrix.engine.d.ts.map