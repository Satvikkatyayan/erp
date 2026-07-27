import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class RecruitmentTimelineService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recordEvent(ctx: PlatformContext, applicationId: string, eventType: string, description?: string): Promise<void>;
}
//# sourceMappingURL=recruitment-timeline.service.d.ts.map