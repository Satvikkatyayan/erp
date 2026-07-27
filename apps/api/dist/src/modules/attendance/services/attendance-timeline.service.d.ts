import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
export declare class AttendanceTimelineService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    recordEvent(ctx: PlatformContext, attendanceDayId: string, eventType: string, description: string): Promise<void>;
}
//# sourceMappingURL=attendance-timeline.service.d.ts.map