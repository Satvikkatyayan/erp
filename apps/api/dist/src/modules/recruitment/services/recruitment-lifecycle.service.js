"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruitmentLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const recruitment_validation_service_1 = require("./recruitment-validation.service");
const recruitment_timeline_service_1 = require("./recruitment-timeline.service");
const candidate_service_1 = require("./candidate.service");
let RecruitmentLifecycleService = class RecruitmentLifecycleService {
    constructor(prisma, sdk, validator, timeline, candidate) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.validator = validator;
        this.timeline = timeline;
        this.candidate = candidate;
    }
    async processApplication(ctx, payload) {
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
    async scheduleInterview(ctx, applicationId, payload) {
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
    async acceptOffer(ctx, applicationId) {
        await this.prisma.recCandidateApplication.update({
            where: { id: applicationId },
            data: { status: 'OFFER_ACCEPTED' }
        });
        await this.timeline.recordEvent(ctx, applicationId, 'OFFER_ACCEPTED');
        await this.sdk.events.publish(ctx, 'OfferAccepted', { applicationId });
        await this.prisma.recCandidateApplication.update({
            where: { id: applicationId },
            data: { status: 'BACKGROUND_VERIFICATION' }
        });
        await this.completeBackgroundVerification(ctx, applicationId);
    }
    async completeBackgroundVerification(ctx, applicationId) {
        await this.prisma.recCandidateApplication.update({
            where: { id: applicationId },
            data: { status: 'ONBOARDING' }
        });
        await this.timeline.recordEvent(ctx, applicationId, 'BACKGROUND_VERIFIED');
        await this.sdk.events.publish(ctx, 'CandidateReadyForOnboarding', { applicationId });
    }
};
exports.RecruitmentLifecycleService = RecruitmentLifecycleService;
exports.RecruitmentLifecycleService = RecruitmentLifecycleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        recruitment_validation_service_1.RecruitmentValidationService,
        recruitment_timeline_service_1.RecruitmentTimelineService,
        candidate_service_1.CandidateService])
], RecruitmentLifecycleService);
//# sourceMappingURL=recruitment-lifecycle.service.js.map