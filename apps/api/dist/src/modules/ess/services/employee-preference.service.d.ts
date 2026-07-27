import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeePreferenceService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    getPreferences(ctx: PlatformContext): Promise<{
        language: string;
        id: string;
        employeeId: string;
        timezone: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        theme: string;
        dashboardLayout: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
    updatePreferences(ctx: PlatformContext, payload: any): Promise<{
        language: string;
        id: string;
        employeeId: string;
        timezone: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        theme: string;
        dashboardLayout: import("@prisma/client/runtime/library").JsonValue | null;
    }>;
}
//# sourceMappingURL=employee-preference.service.d.ts.map