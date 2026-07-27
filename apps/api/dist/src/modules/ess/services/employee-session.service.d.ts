import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class EmployeeSessionService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    registerDevice(ctx: PlatformContext, deviceId: string, deviceName: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        deviceId: string;
        deviceName: string | null;
        isTrusted: boolean;
        lastUsedAt: Date;
    }>;
    createSession(ctx: PlatformContext, tokenJti: string, deviceId: string, ipAddress: string, userAgent: string, expiresAt: Date): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string | null;
        userAgent: string | null;
        deviceId: string | null;
        tokenJti: string;
        expiresAt: Date;
    }>;
    getActiveSessions(ctx: PlatformContext): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        ipAddress: string | null;
        userAgent: string | null;
        deviceId: string | null;
        tokenJti: string;
        expiresAt: Date;
    }[]>;
}
//# sourceMappingURL=employee-session.service.d.ts.map