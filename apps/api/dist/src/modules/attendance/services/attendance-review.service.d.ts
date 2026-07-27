import { PrismaService } from '../../../common/prisma/prisma.service';
import { EventBusService } from '../../../core/events/event-bus.service';
import { AttendanceReviewStatus } from '@prisma/client';
export declare const REVIEW_ROLES_ORDER: string[];
export declare class AttendanceReviewService {
    private readonly prisma;
    private readonly eventBus;
    constructor(prisma: PrismaService, eventBus: EventBusService);
    startReviewProcess(musterId: string, correlationId: string, prismaTx?: any): Promise<void>;
    recordDecision(musterId: string, reviewerId: string, reviewerRole: string, decision: AttendanceReviewStatus, remarks: string, correlationId: string, prismaTx?: any): Promise<void>;
    isEligibleForFinalLock(musterId: string, prismaTx?: any): Promise<boolean>;
}
//# sourceMappingURL=attendance-review.service.d.ts.map