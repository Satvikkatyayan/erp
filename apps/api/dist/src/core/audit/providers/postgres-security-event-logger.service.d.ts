import { ISecurityEventLogger } from './security-event-logger.interface';
import { PrismaService } from '../../../common/prisma/prisma.service';
export declare class PostgresSecurityEventLogger implements ISecurityEventLogger {
    private prisma;
    constructor(prisma: PrismaService);
    logEvent(userId: string | null, eventType: string, details?: any, ipAddress?: string, userAgent?: string): Promise<void>;
}
//# sourceMappingURL=postgres-security-event-logger.service.d.ts.map