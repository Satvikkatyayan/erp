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
var PerformanceLockingService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceLockingService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_timeline_service_1 = require("./performance-timeline.service");
const performance_events_1 = require("../events/performance.events");
let PerformanceLockingService = PerformanceLockingService_1 = class PerformanceLockingService {
    constructor(prisma, sdk, timeline) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.timeline = timeline;
        this.logger = new common_1.Logger(PerformanceLockingService_1.name);
    }
    async lockScope(ctx, cycleId, scope) {
        const cycle = await this.prisma.perfPerformanceCycle.findFirst({
            where: { id: cycleId, tenantId: ctx.tenantId },
        });
        if (!cycle)
            throw new common_1.BadRequestException('Cycle not found');
        const lockedScopes = cycle.lockedScopes || { locks: [] };
        lockedScopes.locks.push({
            level: scope.level,
            targetId: scope.targetId || null,
            lockedBy: ctx.userId,
            lockedAt: new Date().toISOString(),
        });
        await this.prisma.perfPerformanceCycle.update({
            where: { id: cycleId },
            data: { lockedScopes },
        });
        await this.timeline.recordEvent(ctx, cycleId, scope.targetId || null, 'ScopeLocked', {
            level: scope.level,
            targetId: scope.targetId,
        });
        this.logger.log(`Scope locked: ${scope.level} (target: ${scope.targetId || 'all'}) in cycle ${cycleId}`);
    }
    isLocked(lockedScopes, employeeId, departmentId) {
        if (!lockedScopes?.locks)
            return false;
        const locks = lockedScopes.locks;
        if (locks.some((l) => l.level === 'ORGANIZATION'))
            return true;
        if (locks.some((l) => l.level === 'CYCLE'))
            return true;
        if (departmentId && locks.some((l) => l.level === 'DEPARTMENT' && l.targetId === departmentId))
            return true;
        if (locks.some((l) => l.level === 'EMPLOYEE' && l.targetId === employeeId))
            return true;
        return false;
    }
    async reopenReview(ctx, reviewId, reason) {
        const review = await this.prisma.perfReview.findFirst({
            where: { id: reviewId, tenantId: ctx.tenantId },
        });
        if (!review)
            throw new common_1.BadRequestException('Review not found');
        if (review.status !== 'Finalized') {
            throw new common_1.BadRequestException('Only finalized reviews can be reopened');
        }
        await this.sdk.workflow.trigger(ctx, reviewId);
        const maxVersion = await this.prisma.perfReviewVersion.aggregate({
            where: { reviewId, tenantId: ctx.tenantId },
            _max: { versionNumber: true },
        });
        const newVersionNumber = (maxVersion._max.versionNumber || 0) + 1;
        const newVersion = await this.prisma.perfReviewVersion.create({
            data: {
                tenantId: ctx.tenantId,
                reviewId,
                versionNumber: newVersionNumber,
                reviewData: { reopenedFrom: maxVersion._max.versionNumber, reason },
            },
        });
        await this.prisma.perfReview.update({
            where: { id: reviewId },
            data: { status: 'InProgress' },
        });
        await this.prisma.perfReviewSLA.updateMany({
            where: { reviewId, tenantId: ctx.tenantId },
            data: { reopenedAt: new Date() },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.REVIEW_REOPENED, {
            reviewId,
            newVersionNumber,
            reason,
        });
        await this.timeline.recordEvent(ctx, review.cycleId, review.employeeId, 'ReviewReopened', {
            reviewId,
            newVersionNumber,
            reason,
        });
        this.logger.log(`Review ${reviewId} reopened as V${newVersionNumber}`);
        return newVersion;
    }
    async unlockScope(ctx, cycleId, scope) {
        const cycle = await this.prisma.perfPerformanceCycle.findFirst({
            where: { id: cycleId, tenantId: ctx.tenantId },
        });
        if (!cycle)
            throw new common_1.BadRequestException('Cycle not found');
        const lockedScopes = cycle.lockedScopes || { locks: [] };
        lockedScopes.locks = lockedScopes.locks.filter((l) => !(l.level === scope.level && (l.targetId || null) === (scope.targetId || null)));
        await this.prisma.perfPerformanceCycle.update({
            where: { id: cycleId },
            data: { lockedScopes },
        });
        await this.timeline.recordEvent(ctx, cycleId, scope.targetId || null, 'ScopeUnlocked', {
            level: scope.level,
            targetId: scope.targetId,
        });
        this.logger.log(`Scope unlocked: ${scope.level} (target: ${scope.targetId || 'all'}) in cycle ${cycleId}`);
    }
};
exports.PerformanceLockingService = PerformanceLockingService;
exports.PerformanceLockingService = PerformanceLockingService = PerformanceLockingService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_timeline_service_1.PerformanceTimelineService])
], PerformanceLockingService);
//# sourceMappingURL=performance-locking.service.js.map