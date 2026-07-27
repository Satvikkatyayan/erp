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
var PerformanceSnapshotService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PerformanceSnapshotService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let PerformanceSnapshotService = PerformanceSnapshotService_1 = class PerformanceSnapshotService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(PerformanceSnapshotService_1.name);
    }
    async captureSnapshot(ctx, cycleId, employeeId) {
        const existing = await this.prisma.perfPerformanceSnapshot.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        if (existing) {
            this.logger.warn(`Using existing snapshot for deterministic evaluation (Employee ${employeeId})`);
            return existing;
        }
        const employee = await this.prisma.empEmployee.findFirst({
            where: { id: employeeId, tenantId: ctx.tenantId },
        });
        const managerData = employee ? await this.getManagerData(ctx.tenantId, employee) : null;
        const positionData = employee ? await this.getPositionData(ctx.tenantId, employee) : null;
        const goalAssignments = await this.prisma.perfGoalAssignment.findMany({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
            include: { goal: true },
        });
        const goalProgress = await this.prisma.perfGoalProgress.findMany({
            where: {
                tenantId: ctx.tenantId,
                assignment: { cycleId, employeeId },
            },
        });
        const competencyAssignments = await this.prisma.perfCompetencyAssignment.findMany({
            where: { employeeId, tenantId: ctx.tenantId },
        });
        const review = await this.prisma.perfReview.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        const competencyRatings = review
            ? await this.prisma.perfCompetencyRating.findMany({
                where: { reviewId: review.id, tenantId: ctx.tenantId },
            })
            : [];
        const kpiAssignments = await this.prisma.perfKPIAssignment.findMany({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
            include: { results: true, kpi: true },
        });
        const kpiResults = kpiAssignments.flatMap((a) => a.results.map((r) => ({
            ...r,
            kpiName: a.kpi.name,
            kpiCode: a.kpi.code,
            targetValue: a.targetValue,
        })));
        const cycleConfig = await this.prisma.perfCycleConfiguration.findFirst({
            where: { organizationId: ctx.organizationId, tenantId: ctx.tenantId },
        });
        const ratingScaleVersion = cycleConfig?.ratingScaleId || null;
        const reviewTemplateVersion = review?.templateVersionId || null;
        const rulesEngineVersion = '1.0.0';
        const featureFlags = ctx.featureFlags || {};
        const attendanceIncluded = featureFlags['PERF_INCLUDE_ATTENDANCE'] === true;
        const leaveIncluded = featureFlags['PERF_INCLUDE_LEAVE'] === true;
        const attendanceMetrics = attendanceIncluded
            ? { totalWorkingDays: 22, presentDays: 20, absentDays: 2, lateDays: 1 }
            : null;
        const leaveMetrics = leaveIncluded
            ? { totalLeaveDays: 5, plannedLeaveDays: 4, unplannedLeaveDays: 1, maxUnplannedThreshold: 5 }
            : null;
        const snapshotData = {
            employeeData: employee ? { id: employee.id, employeeNumber: employee.employeeNumber, status: employee.status } : null,
            managerData,
            positionData,
            goalAssignments: goalAssignments.map((a) => ({
                id: a.id,
                goalId: a.goalId,
                goalTitle: a.goal.title,
                goalVersionNumber: a.goal.versionNumber,
                weight: a.weight,
                targetValue: a.targetValue,
                status: a.status,
            })),
            goalProgress: goalProgress.map((p) => ({
                assignmentId: p.assignmentId,
                goalVersionNumber: p.goalVersionNumber,
                progressValue: p.progressValue,
                recordedAt: p.recordedAt,
            })),
            competencyAssignments: competencyAssignments.map((a) => ({
                id: a.id,
                competencyId: a.competencyId,
                targetLevel: a.targetLevel,
                currentLevel: a.currentLevel,
            })),
            competencyRatings: competencyRatings.map((r) => ({
                competencyId: r.competencyId,
                ratedById: r.ratedById,
                rating: r.rating,
            })),
            kpiResults,
            ratingScaleVersion,
            reviewTemplateVersion,
            rulesEngineVersion,
            attendanceIncluded,
            leaveIncluded,
            attendanceMetrics,
            leaveMetrics,
        };
        const snapshot = await this.prisma.perfPerformanceSnapshot.create({
            data: {
                tenantId: ctx.tenantId,
                cycleId,
                employeeId,
                snapshotData,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.SNAPSHOT_CREATED, {
            snapshotId: snapshot.id,
            cycleId,
            employeeId,
            attendanceIncluded,
            leaveIncluded,
        });
        this.logger.log(`Performance snapshot captured for employee ${employeeId} in cycle ${cycleId}`);
        return snapshot;
    }
    async getManagerData(tenantId, employee) {
        return {
            managerId: null,
            managerName: null,
        };
    }
    async getPositionData(tenantId, employee) {
        return {
            positionId: null,
            positionTitle: null,
            departmentId: null,
            departmentName: null,
        };
    }
};
exports.PerformanceSnapshotService = PerformanceSnapshotService;
exports.PerformanceSnapshotService = PerformanceSnapshotService = PerformanceSnapshotService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], PerformanceSnapshotService);
//# sourceMappingURL=performance-snapshot.service.js.map