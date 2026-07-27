import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class ReservationEngine {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    createReservation(ctx: PlatformContext, assetId: string, employeeId: string, startTime: Date, endTime: Date, isRecurring: boolean, recurrenceRule?: string): Promise<{
        id: string;
        employeeId: string;
        tenantId: string;
        createdAt: Date;
        status: string;
        assetId: string;
        startTime: Date;
        endTime: Date;
        isRecurring: boolean;
        recurrenceRule: string | null;
        purpose: string | null;
        approvedBy: string | null;
    }>;
}
//# sourceMappingURL=reservation.engine.d.ts.map