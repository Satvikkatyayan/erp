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
var PerformanceCycleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceCycleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_evaluation_service_1 = require("./performance-evaluation.service");
const performance_locking_service_1 = require("./performance-locking.service");
const performance_scoring_engine_1 = require("./performance-scoring.engine");
const nine_box_service_1 = require("./nine-box.service");
const performance_timeline_service_1 = require("./performance-timeline.service");
const performance_events_1 = require("../events/performance.events");
let PerformanceCycleService = PerformanceCycleService_1 = class PerformanceCycleService {
    constructor(prisma, sdk, evaluationService, lockingService, scoringEngine, nineBoxService, timeline) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.evaluationService = evaluationService;
        this.lockingService = lockingService;
        this.scoringEngine = scoringEngine;
        this.nineBoxService = nineBoxService;
        this.timeline = timeline;
        this.logger = new common_1.Logger(PerformanceCycleService_1.name);
    }
    async executeEvaluationCycle(ctx, cycleId) {
        this.logger.log(`Starting evaluation cycle: ${cycleId}`);
        await this.prisma.perfPerformanceCycle.update({
            where: { id: cycleId },
            data: { status: 'Calibration' },
        });
        const reviews = await this.prisma.perfReview.findMany({
            where: { cycleId, tenantId: ctx.tenantId },
        });
        const evaluationResults = [];
        for (const review of reviews) {
            try {
                const { rating, trace } = await this.evaluationService.evaluateEmployee(ctx, cycleId, review.employeeId);
                evaluationResults.push({
                    employeeId: review.employeeId,
                    score: trace.finalRating,
                    trace,
                });
            }
            catch (err) {
                this.logger.error(`Failed to evaluate employee ${review.employeeId}: ${err.message}`);
            }
        }
        const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
            where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
        });
        if (cycleConfig?.forcedDistribution) {
            this.logger.log('Applying forced distribution...');
            let distributionPolicy = { top: 20, middle: 60, bottom: 20 };
            try {
                const rulesResult = await this.sdk.rules.evaluate(ctx, 'PERF_FORCED_DISTRIBUTION', {
                    organizationId: ctx.organizationId,
                });
                if (rulesResult && rulesResult.top) {
                    distributionPolicy = rulesResult;
                }
            }
            catch {
                this.logger.warn('Rules SDK unavailable for forced distribution, using defaults');
            }
            const adjusted = this.scoringEngine.applyForcedDistribution(evaluationResults.map(r => ({ employeeId: r.employeeId, score: r.score })), distributionPolicy);
            for (const adj of adjusted) {
                if (adj.originalScore !== adj.adjustedScore) {
                    await this.prisma.perfRating.updateMany({
                        where: { cycleId, employeeId: adj.employeeId, tenantId: ctx.tenantId },
                        data: { overallScore: adj.adjustedScore },
                    });
                }
            }
            await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.FORCED_DISTRIBUTION_APPLIED, {
                cycleId,
                distributionPolicy,
                adjustedCount: adjusted.filter(a => a.originalScore !== a.adjustedScore).length,
            });
        }
        if (cycleConfig && cycleConfig.enableBonusRecommendation !== false) {
            for (const result of evaluationResults) {
                const bonusPct = result.trace.bonusRecommendationPct;
                if (bonusPct > 0) {
                    const rating = await this.prisma.perfRating.findFirst({
                        where: { cycleId, employeeId: result.employeeId, tenantId: ctx.tenantId },
                    });
                    if (rating) {
                        await this.prisma.perfBonusRecommendation.create({
                            data: {
                                tenantId: ctx.tenantId,
                                employeeId: result.employeeId,
                                cycleId,
                                ratingId: rating.id,
                                recommendedPct: bonusPct,
                                status: 'Pending',
                            },
                        });
                        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.BONUS_RECOMMENDED, {
                            employeeId: result.employeeId,
                            cycleId,
                            recommendedPct: bonusPct,
                        });
                    }
                }
            }
        }
        await this.registerAnalyticsDatasets(ctx, cycleId);
        await this.sdk.search.index(ctx, 'performance-cycles', cycleId, {
            cycleId,
            status: 'Evaluated',
            employeeCount: evaluationResults.length,
        });
        await this.timeline.recordEvent(ctx, cycleId, null, 'EvaluationCycleCompleted', {
            employeeCount: evaluationResults.length,
        });
        this.logger.log(`Evaluation cycle completed: ${evaluationResults.length} employees evaluated`);
    }
    async finalizeCycle(ctx, cycleId) {
        this.logger.log(`Finalizing cycle: ${cycleId}`);
        await this.lockingService.lockScope(ctx, cycleId, { level: 'CYCLE' });
        await this.prisma.perfReview.updateMany({
            where: { cycleId, tenantId: ctx.tenantId },
            data: { status: 'Finalized' },
        });
        const reviews = await this.prisma.perfReview.findMany({
            where: { cycleId, tenantId: ctx.tenantId },
            select: { id: true },
        });
        const reviewIds = reviews.map((r) => r.id);
        if (reviewIds.length > 0) {
            await this.prisma.perfReviewSLA.updateMany({
                where: { tenantId: ctx.tenantId, reviewId: { in: reviewIds } },
                data: { finalizedAt: new Date() },
            });
        }
        await this.prisma.perfPerformanceCycle.update({
            where: { id: cycleId },
            data: { status: 'Finalized' },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.PERFORMANCE_FINALIZED, { cycleId });
        await this.timeline.recordEvent(ctx, cycleId, null, 'CycleFinalized', { cycleId });
        this.logger.log(`Cycle ${cycleId} finalized`);
    }
    async simulateCycle(ctx, cycleId) {
        const reviews = await this.prisma.perfReview.findMany({
            where: { cycleId, tenantId: ctx.tenantId },
        });
        const results = [];
        for (const review of reviews) {
            const trace = await this.evaluationService.simulateEvaluation(ctx, cycleId, review.employeeId);
            results.push({ employeeId: review.employeeId, trace });
        }
        this.logger.log(`Simulation completed for ${results.length} employees`);
        return results;
    }
    async registerAnalyticsDatasets(ctx, cycleId) {
        const datasets = [
            { name: 'perf_goal_alignment', schema: { cycleId, type: 'goal_alignment' } },
            { name: 'perf_goal_completion_rate', schema: { cycleId, type: 'goal_completion' } },
            { name: 'perf_review_sla', schema: { cycleId, type: 'review_sla' } },
            { name: 'perf_kpi_distribution', schema: { cycleId, type: 'kpi_distribution' } },
            { name: 'perf_rating_distribution', schema: { cycleId, type: 'rating_distribution' } },
            { name: 'perf_calibration_impact', schema: { cycleId, type: 'calibration_impact' } },
            { name: 'perf_high_potential', schema: { cycleId, type: 'high_potential' } },
            { name: 'perf_skill_gap_matrix', schema: { cycleId, type: 'skill_gap' } },
            { name: 'perf_nine_box_matrix', schema: { cycleId, type: 'nine_box' } },
            { name: 'perf_promotion_pipeline', schema: { cycleId, type: 'promotion_pipeline' } },
        ];
        for (const ds of datasets) {
            await this.sdk.reporting.registerDataset(ctx, ds.name, ds.schema);
        }
        this.logger.debug(`Registered ${datasets.length} analytics datasets for cycle ${cycleId}`);
    }
};
exports.PerformanceCycleService = PerformanceCycleService;
exports.PerformanceCycleService = PerformanceCycleService = PerformanceCycleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_evaluation_service_1.PerformanceEvaluationService,
        performance_locking_service_1.PerformanceLockingService,
        performance_scoring_engine_1.PerformanceScoringEngine,
        nine_box_service_1.NineBoxService,
        performance_timeline_service_1.PerformanceTimelineService])
], PerformanceCycleService);
//# sourceMappingURL=performance-cycle.service.js.map