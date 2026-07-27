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
var CalibrationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CalibrationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
const performance_timeline_service_1 = require("./performance-timeline.service");
let CalibrationService = CalibrationService_1 = class CalibrationService {
    constructor(prisma, sdk, timeline) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.timeline = timeline;
        this.logger = new common_1.Logger(CalibrationService_1.name);
    }
    async calibrateRating(ctx, data) {
        const rating = await this.prisma.perfRating.findFirst({
            where: { id: data.ratingId, tenantId: ctx.tenantId },
        });
        if (!rating) {
            throw new Error('Rating not found');
        }
        const existing = await this.prisma.perfCalibration.findFirst({
            where: { ratingId: data.ratingId, tenantId: ctx.tenantId },
        });
        const previousScore = existing ? existing.calibratedScore : rating.overallScore;
        let calibration;
        if (existing) {
            calibration = await this.prisma.perfCalibration.update({
                where: { id: existing.id },
                data: {
                    originalScore: existing.originalScore,
                    calibratedScore: data.calibratedScore,
                    calibratedBy: ctx.userId,
                    reason: data.reason,
                },
            });
        }
        else {
            calibration = await this.prisma.perfCalibration.create({
                data: {
                    tenantId: ctx.tenantId,
                    ratingId: data.ratingId,
                    originalScore: rating.overallScore,
                    calibratedScore: data.calibratedScore,
                    calibratedBy: ctx.userId,
                    reason: data.reason,
                },
            });
        }
        await this.prisma.perfCalibrationHistory.create({
            data: {
                tenantId: ctx.tenantId,
                calibrationId: calibration.id,
                ratingId: data.ratingId,
                previousScore,
                newScore: data.calibratedScore,
                adjustedBy: ctx.userId,
                reason: data.reason,
                stage: data.stage,
            },
        });
        await this.sdk.workflow.trigger(ctx, calibration.id);
        await this.timeline.recordEvent(ctx, rating.cycleId, rating.employeeId, 'CalibrationAdjusted', {
            calibrationId: calibration.id,
            stage: data.stage,
            previousScore,
            newScore: data.calibratedScore,
        });
        this.logger.log(`Calibration: ${previousScore} → ${data.calibratedScore} (stage: ${data.stage})`);
        return calibration;
    }
    async completeCalibration(ctx, calibrationId) {
        const calibration = await this.prisma.perfCalibration.findFirst({
            where: { id: calibrationId, tenantId: ctx.tenantId },
            include: { rating: true },
        });
        if (!calibration)
            return;
        await this.prisma.perfRating.update({
            where: { id: calibration.ratingId },
            data: { overallScore: calibration.calibratedScore },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.CALIBRATION_COMPLETED, {
            calibrationId,
            ratingId: calibration.ratingId,
            employeeId: calibration.rating.employeeId,
            originalScore: calibration.originalScore,
            calibratedScore: calibration.calibratedScore,
        });
        await this.timeline.recordEvent(ctx, calibration.rating.cycleId, calibration.rating.employeeId, 'CalibrationCompleted', { calibrationId });
        this.logger.log(`Calibration completed: ${calibrationId}`);
    }
    async getCalibrationHistory(tenantId, ratingId) {
        return this.prisma.perfCalibrationHistory.findMany({
            where: { tenantId, ratingId },
            orderBy: { adjustedAt: 'asc' },
        });
    }
};
exports.CalibrationService = CalibrationService;
exports.CalibrationService = CalibrationService = CalibrationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_timeline_service_1.PerformanceTimelineService])
], CalibrationService);
//# sourceMappingURL=calibration.service.js.map