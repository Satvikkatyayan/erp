import { PrismaService } from '../../../../common/prisma/prisma.service';
import { CompleteReviewCommand } from '../complete-review.command';
import { AttendanceReviewService } from '../../services/attendance-review.service';
export declare class CompleteReviewHandler {
    private readonly prisma;
    private readonly reviewService;
    constructor(prisma: PrismaService, reviewService: AttendanceReviewService);
    execute(command: CompleteReviewCommand): Promise<{
        success: boolean;
    }>;
}
//# sourceMappingURL=complete-review.handler.d.ts.map