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
var RatingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_scoring_engine_1 = require("./performance-scoring.engine");
const performance_events_1 = require("../events/performance.events");
let RatingService = RatingService_1 = class RatingService {
    constructor(prisma, sdk, scoringEngine) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.scoringEngine = scoringEngine;
        this.logger = new common_1.Logger(RatingService_1.name);
    }
    async generateRating(ctx, cycleId, employeeId, snapshotData) {
        this.logger.log(`Generating rating for employee ${employeeId} in cycle ${cycleId}`);
        const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
            where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
        });
        const scoringCtx = {
            tenantId: ctx.tenantId,
            organizationId: ctx.organizationId,
            cycleId,
            employeeId,
            snapshotData,
            cycleConfig: cycleConfig || {},
            featureFlags: ctx.featureFlags || {},
        };
        const trace = await this.scoringEngine.evaluate(scoringCtx);
        await this.prisma.perfWeightedScore.deleteMany({
            where: { rating: { cycleId, employeeId, tenantId: ctx.tenantId } },
        });
        await this.prisma.perfRating.deleteMany({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        const ratingLabel = this.getLabelForScore(trace.finalRating);
        const rating = await this.prisma.perfRating.create({
            data: {
                tenantId: ctx.tenantId,
                cycleId,
                employeeId,
                overallScore: trace.finalRating,
                ratingLabel,
            },
        });
        for (const step of trace.steps) {
            if (step.weight > 0 && step.component !== 'Normalization' && step.component !== 'BonusRecommendation') {
                await this.prisma.perfWeightedScore.create({
                    data: {
                        tenantId: ctx.tenantId,
                        ratingId: rating.id,
                        goalAssignmentId: step.component,
                        weight: step.weight,
                        score: step.rawScore,
                        weightedValue: step.weightedScore,
                    },
                });
            }
        }
        await this.prisma.perfScoreTrace.create({
            data: {
                tenantId: ctx.tenantId,
                cycleId,
                employeeId,
                ratingId: rating.id,
                traceData: trace.steps,
                goalScore: trace.goalScore,
                competencyScore: trace.competencyScore,
                kpiScore: trace.kpiScore,
                attendanceScore: trace.attendanceScore,
                leaveScore: trace.leaveScore,
                weightedTotal: trace.weightedTotal,
                normalizedScore: trace.normalizedScore,
                finalRating: trace.finalRating,
                engineVersion: trace.engineVersion,
                rulesVersion: snapshotData?.rulesEngineVersion || null,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.SCORE_CALCULATED, {
            ratingId: rating.id,
            cycleId,
            employeeId,
            overallScore: trace.finalRating,
            ratingLabel,
        });
        this.logger.log(`Rating generated: ${rating.id}, score=${trace.finalRating}, label=${ratingLabel}`);
        return { rating, trace };
    }
    getLabelForScore(score) {
        if (score >= 90)
            return 'Exceptional';
        if (score >= 80)
            return 'Exceeds Expectations';
        if (score >= 70)
            return 'Meets Expectations';
        if (score >= 60)
            return 'Needs Improvement';
        return 'Below Expectations';
    }
};
exports.RatingService = RatingService;
exports.RatingService = RatingService = RatingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_scoring_engine_1.PerformanceScoringEngine])
], RatingService);
//# sourceMappingURL=rating.service.js.map