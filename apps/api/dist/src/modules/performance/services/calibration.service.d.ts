import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PerformanceTimelineService } from './performance-timeline.service';
export declare class CalibrationService {
    private readonly prisma;
    private readonly sdk;
    private readonly timeline;
    private readonly logger;
    constructor(prisma: PrismaService, sdk: PlatformSDK, timeline: PerformanceTimelineService);
    calibrateRating(ctx: any, data: {
        ratingId: string;
        calibratedScore: number;
        reason?: string;
        stage: string;
    }): Promise<any>;
    completeCalibration(ctx: any, calibrationId: string): Promise<void>;
    getCalibrationHistory(tenantId: string, ratingId: string): Promise<any[]>;
}
//# sourceMappingURL=calibration.service.d.ts.map