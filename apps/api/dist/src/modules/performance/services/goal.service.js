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
var GoalService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
const performance_timeline_service_1 = require("./performance-timeline.service");
let GoalService = GoalService_1 = class GoalService {
    constructor(prisma, sdk, timeline) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.timeline = timeline;
        this.logger = new common_1.Logger(GoalService_1.name);
    }
    async createGoal(ctx, data) {
        const goal = await this.prisma.perfGoal.create({
            data: {
                tenantId: ctx.tenantId,
                title: data.title,
                description: data.description,
                category: data.category,
                parentGoalId: data.parentGoalId,
                versionNumber: 1,
                isActive: true,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.GOAL_VERSION_CREATED, {
            goalId: goal.id,
            versionNumber: 1,
            title: data.title,
        });
        this.logger.log(`Goal created: ${goal.id} (V1)`);
        return goal;
    }
    async createNewVersion(ctx, currentGoalId, updates) {
        const current = await this.prisma.perfGoal.findFirst({
            where: { id: currentGoalId, tenantId: ctx.tenantId, isActive: true },
        });
        if (!current) {
            throw new common_1.BadRequestException('Active goal not found');
        }
        await this.prisma.perfGoal.update({
            where: { id: currentGoalId },
            data: { isActive: false },
        });
        const newGoal = await this.prisma.perfGoal.create({
            data: {
                tenantId: ctx.tenantId,
                title: updates.title || current.title,
                description: updates.description || current.description,
                category: updates.category || current.category,
                parentGoalId: current.parentGoalId,
                versionNumber: current.versionNumber + 1,
                isActive: true,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.GOAL_VERSION_CREATED, {
            goalId: newGoal.id,
            previousGoalId: currentGoalId,
            versionNumber: newGoal.versionNumber,
        });
        this.logger.log(`Goal versioned: ${currentGoalId} (V${current.versionNumber}) → ${newGoal.id} (V${newGoal.versionNumber})`);
        return newGoal;
    }
    async assignGoal(ctx, data) {
        const assignment = await this.prisma.perfGoalAssignment.create({
            data: {
                tenantId: ctx.tenantId,
                cycleId: data.cycleId,
                employeeId: data.employeeId,
                goalId: data.goalId,
                weight: data.weight || 0,
                targetValue: data.targetValue,
                status: 'Assigned',
            },
        });
        return assignment;
    }
    async recordProgress(ctx, assignmentId, progressValue, note) {
        const assignment = await this.prisma.perfGoalAssignment.findFirst({
            where: { id: assignmentId, tenantId: ctx.tenantId },
            include: { goal: true },
        });
        if (!assignment) {
            throw new common_1.BadRequestException('Goal assignment not found');
        }
        const progress = await this.prisma.perfGoalProgress.create({
            data: {
                tenantId: ctx.tenantId,
                assignmentId,
                goalVersionNumber: assignment.goal.versionNumber,
                progressValue,
                note,
            },
        });
        if (assignment.targetValue && progressValue >= assignment.targetValue) {
            await this.prisma.perfGoalAssignment.update({
                where: { id: assignmentId },
                data: { status: 'Completed' },
            });
            await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.GOAL_COMPLETED, {
                assignmentId,
                goalId: assignment.goalId,
                progressValue,
                targetValue: assignment.targetValue,
            });
        }
        return progress;
    }
};
exports.GoalService = GoalService;
exports.GoalService = GoalService = GoalService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        performance_timeline_service_1.PerformanceTimelineService])
], GoalService);
//# sourceMappingURL=goal.service.js.map