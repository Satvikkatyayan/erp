import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { RecruitmentValidationService } from './recruitment-validation.service';
import { RecruitmentTimelineService } from './recruitment-timeline.service';
import { CandidateService } from './candidate.service';
export declare class RecruitmentLifecycleService {
    private readonly prisma;
    private readonly sdk;
    private readonly validator;
    private readonly timeline;
    private readonly candidate;
    constructor(prisma: PrismaService, sdk: PlatformSDK, validator: RecruitmentValidationService, timeline: RecruitmentTimelineService, candidate: CandidateService);
    processApplication(ctx: PlatformContext, payload: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        candidateId: string;
        requisitionId: string;
    }>;
    scheduleInterview(ctx: PlatformContext, applicationId: string, payload: any): Promise<{
        id: string;
        tenantId: string;
        createdAt: Date;
        updatedAt: Date;
        status: string;
        createdBy: string | null;
        updatedBy: string | null;
        title: string;
        applicationId: string;
        requisitionId: string;
        roundNumber: number;
        scheduledAt: Date;
        durationMinutes: number;
    }>;
    acceptOffer(ctx: PlatformContext, applicationId: string): Promise<void>;
    completeBackgroundVerification(ctx: PlatformContext, applicationId: string): Promise<void>;
}
//# sourceMappingURL=recruitment-lifecycle.service.d.ts.map