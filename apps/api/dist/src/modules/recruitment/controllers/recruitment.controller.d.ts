import { RecruitmentLifecycleService } from '../services/recruitment-lifecycle.service';
export declare class RecruitmentController {
    private readonly lifecycle;
    constructor(lifecycle: RecruitmentLifecycleService);
    apply(req: any, payload: any): Promise<{
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
    scheduleInterview(req: any, id: string, payload: any): Promise<{
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
    acceptOffer(req: any, id: string): Promise<void>;
}
//# sourceMappingURL=recruitment.controller.d.ts.map