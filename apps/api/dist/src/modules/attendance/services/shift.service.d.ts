import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class ShiftService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    assignShift(ctx: PlatformContext, employeeId: string, templateId: string, effectiveFrom: Date, effectiveTo?: Date): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        effectiveFrom: Date;
        effectiveTo: Date | null;
        shiftTemplateId: string;
    }>;
}
//# sourceMappingURL=shift.service.d.ts.map