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
var PerformanceEvaluationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceEvaluationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_snapshot_service_1 = require("./performance-snapshot.service");
const rating_service_1 = require("./rating.service");
const performance_scoring_engine_1 = require("./performance-scoring.engine");
const calibration_service_1 = require("./calibration.service");
const nine_box_service_1 = require("./nine-box.service");
const development_recommendation_service_1 = require("./development-recommendation.service");
const review_snapshot_service_1 = require("./review-snapshot.service");
const performance_timeline_service_1 = require("./performance-timeline.service");
let PerformanceEvaluationService = PerformanceEvaluationService_1 = class PerformanceEvaluationService {
    constructor(prisma, sdk, snapshotService, ratingService, scoringEngine, calibrationService, nineBoxService, devRecommendationService, reviewSnapshotService, timeline) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.snapshotService = snapshotService;
        this.ratingService = ratingService;
        this.scoringEngine = scoringEngine;
        this.calibrationService = calibrationService;
        this.nineBoxService = nineBoxService;
        this.devRecommendationService = devRecommendationService;
        this.reviewSnapshotService = reviewSnapshotService;
        this.timeline = timeline;
        this.logger = new common_1.Logger(PerformanceEvaluationService_1.name);
    }
    async evaluateEmployee(ctx, cycleId, employeeId) {
        this.logger.log(`Evaluating employee ${employeeId} in cycle ${cycleId}`);
        const snapshot = await this.snapshotService.captureSnapshot(ctx, cycleId, employeeId);
        const snapshotData = snapshot.snapshotData;
        const { rating, trace } = await this.ratingService.generateRating(ctx, cycleId, employeeId, snapshotData);
        await this.devRecommendationService.generateRecommendations(ctx, cycleId, employeeId);
        const review = await this.prisma.perfReview.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        if (review) {
            await this.reviewSnapshotService.captureSnapshot(ctx, {
                cycleId,
                employeeId,
                reviewId: review.id,
                snapshotType: 'FINALIZED',
            });
        }
        await this.timeline.recordEvent(ctx, cycleId, employeeId, 'EmployeeEvaluated', {
            ratingId: rating.id,
            score: trace.finalRating,
        });
        this.logger.log(`Employee ${employeeId} evaluated: score=${trace.finalRating}`);
        return { snapshot, rating, trace };
    }
    async simulateEvaluation(ctx, cycleId, employeeId) {
        this.logger.log(`Simulating evaluation for employee ${employeeId} in cycle ${cycleId}`);
        const snapshot = await this.prisma.perfPerformanceSnapshot.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        const snapshotData = snapshot?.snapshotData || {};
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
        return this.scoringEngine.simulate(scoringCtx);
    }
    async processNineBox(ctx, cycleId, employeeId) {
        return this.nineBoxService.calculatePlacement(ctx, cycleId, employeeId);
    }
    async processCalibration(ctx, ratingId, calibratedScore, stage, reason) {
        return this.calibrationService.calibrateRating(ctx, {
            ratingId,
            calibratedScore,
            reason,
            stage,
        });
    }
};
exports.PerformanceEvaluationService = PerformanceEvaluationService;
exports.PerformanceEvaluationService = PerformanceEvaluationService = PerformanceEvaluationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_snapshot_service_1.PerformanceSnapshotService,
        rating_service_1.RatingService,
        performance_scoring_engine_1.PerformanceScoringEngine,
        calibration_service_1.CalibrationService,
        nine_box_service_1.NineBoxService,
        development_recommendation_service_1.DevelopmentRecommendationService,
        review_snapshot_service_1.ReviewSnapshotService,
        performance_timeline_service_1.PerformanceTimelineService])
], PerformanceEvaluationService);
//# sourceMappingURL=performance-evaluation.service.js.map