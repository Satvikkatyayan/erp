import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../common/prisma/prisma.service';
import { PlatformSDK } from '../../../core/sdk/platform.sdk';
import { PlatformContext } from '../../../core/contracts/context/platform-context';
import { RecruitmentValidationService } from './recruitment-validation.service';
import { RecruitmentTimelineService } from './recruitment-timeline.service';
import { CandidateService } from './candidate.service';

@Injectable()
export class RecruitmentLifecycleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly sdk: PlatformSDK,
    private readonly validator: RecruitmentValidationService,
    private readonly timeline: RecruitmentTimelineService,
    private readonly candidate: CandidateService
  ) {}

  async processApplication(ctx: PlatformContext, payload: any) {
    await this.validator.validateNewCandidate(ctx, payload);
    const candidate = await this.candidate.createCandidate(ctx, payload);

    const app = await this.prisma.recCandidateApplication.create({
      data: {
        tenantId: ctx.tenantId,
        candidateId: candidate.id,
        requisitionId: payload.requisitionId,
        status: 'APPLIED'
      }
    });

    await this.timeline.recordEvent(ctx, app.id, 'APPLIED');
    await this.sdk.events.publish(ctx, 'CandidateApplied', { applicationId: app.id });
    
    return app;
  }

  async scheduleInterview(ctx: PlatformContext, applicationId: string, payload: any) {
    const interview = await this.prisma.recInterview.create({
      data: {
        tenantId: ctx.tenantId,
        applicationId,
        requisitionId: payload.requisitionId,
        title: payload.title,
        roundNumber: payload.roundNumber,
        scheduledAt: payload.scheduledAt,
        durationMinutes: payload.durationMinutes
      }
    });
    
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'INTERVIEWING' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'INTERVIEW_SCHEDULED');
    await this.sdk.events.publish(ctx, 'InterviewScheduled', { interviewId: interview.id });
    
    return interview;
  }

  async acceptOffer(ctx: PlatformContext, applicationId: string) {
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'OFFER_ACCEPTED' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'OFFER_ACCEPTED');
    await this.sdk.events.publish(ctx, 'OfferAccepted', { applicationId });
    
    // Check if background verification is needed, otherwise transition directly
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'BACKGROUND_VERIFICATION' }
    });

    // SIMULATING: Background verified -> Ready for Onboarding
    await this.completeBackgroundVerification(ctx, applicationId);
  }

  async completeBackgroundVerification(ctx: PlatformContext, applicationId: string) {
    await this.prisma.recCandidateApplication.update({
      where: { id: applicationId },
      data: { status: 'ONBOARDING' }
    });

    await this.timeline.recordEvent(ctx, applicationId, 'BACKGROUND_VERIFIED');
    
    // IMPORTANT DECOUPLING EVENT: Emit CandidateReadyForOnboarding
    await this.sdk.events.publish(ctx, 'CandidateReadyForOnboarding', { applicationId });
  }
}
