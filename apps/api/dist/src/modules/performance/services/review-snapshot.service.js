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
var ReviewSnapshotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let ReviewSnapshotService = ReviewSnapshotService_1 = class ReviewSnapshotService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(ReviewSnapshotService_1.name);
    }
    async captureSnapshot(ctx, data) {
        const review = await this.prisma.perfReview.findFirst({
            where: { id: data.reviewId, tenantId: ctx.tenantId },
            include: {
                versions: { orderBy: { versionNumber: 'desc' }, take: 1 },
                participants: true,
                comments: true,
                competencyRatings: true,
            },
        });
        if (!review)
            throw new Error('Review not found');
        const rating = await this.prisma.perfRating.findFirst({
            where: { cycleId: data.cycleId, employeeId: data.employeeId, tenantId: ctx.tenantId },
            include: { weightedScores: true, calibration: true },
        });
        const scoreTrace = await this.prisma.perfScoreTrace.findFirst({
            where: { cycleId: data.cycleId, employeeId: data.employeeId, tenantId: ctx.tenantId },
            orderBy: { createdAt: 'desc' },
        });
        const reviewData = {
            reviewId: review.id,
            status: review.status,
            templateVersionId: review.templateVersionId,
            latestVersion: review.versions[0] || null,
            participants: review.participants.map((p) => ({
                participantId: p.participantId,
                reviewType: p.reviewType,
                status: p.status,
                ratingGiven: p.ratingGiven,
                submittedAt: p.submittedAt,
            })),
            comments: review.comments.map((c) => ({
                authorId: c.authorId,
                content: c.content,
                createdAt: c.createdAt,
            })),
            competencyRatings: review.competencyRatings.map((r) => ({
                competencyId: r.competencyId,
                ratedById: r.ratedById,
                rating: r.rating,
            })),
            rating: rating ? {
                overallScore: rating.overallScore,
                ratingLabel: rating.ratingLabel,
                weightedScores: rating.weightedScores,
                calibration: rating.calibration ? {
                    originalScore: rating.calibration.originalScore,
                    calibratedScore: rating.calibration.calibratedScore,
                    reason: rating.calibration.reason,
                } : null,
            } : null,
        };
        const snapshot = await this.prisma.perfReviewSnapshot.create({
            data: {
                tenantId: ctx.tenantId,
                cycleId: data.cycleId,
                employeeId: data.employeeId,
                reviewId: data.reviewId,
                snapshotType: data.snapshotType || 'FINALIZED',
                reviewData,
                scoreTrace: scoreTrace?.traceData || null,
                templateVersionId: review.templateVersionId,
                finalScore: rating?.overallScore || null,
                finalLabel: rating?.ratingLabel || null,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.REVIEW_SNAPSHOT_CREATED, {
            snapshotId: snapshot.id,
            reviewId: data.reviewId,
            cycleId: data.cycleId,
            employeeId: data.employeeId,
            snapshotType: data.snapshotType || 'FINALIZED',
        });
        this.logger.log(`Review snapshot captured: ${snapshot.id} (type: ${snapshot.snapshotType})`);
        return snapshot;
    }
};
exports.ReviewSnapshotService = ReviewSnapshotService;
exports.ReviewSnapshotService = ReviewSnapshotService = ReviewSnapshotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], ReviewSnapshotService);
//# sourceMappingURL=review-snapshot.service.js.map