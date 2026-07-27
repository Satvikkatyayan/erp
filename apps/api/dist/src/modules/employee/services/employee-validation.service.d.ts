import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class EmployeeValidationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    validateNewHire(ctx: PlatformContext, payload: any): Promise<void>;
}
//# sourceMappingURL=employee-validation.service.d.ts.map