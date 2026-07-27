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
var GoalDependencyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoalDependencyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let GoalDependencyService = GoalDependencyService_1 = class GoalDependencyService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(GoalDependencyService_1.name);
    }
    async addDependency(ctx, data) {
        if (data.goalId === data.dependsOnGoalId) {
            throw new common_1.BadRequestException('A goal cannot depend on itself');
        }
        const hasCycle = await this.detectCycle(ctx.tenantId, data.dependsOnGoalId, data.goalId);
        if (hasCycle) {
            throw new common_1.BadRequestException('Circular dependency detected');
        }
        const dependency = await this.prisma.perfGoalDependency.create({
            data: {
                tenantId: ctx.tenantId,
                goalId: data.goalId,
                dependsOnGoalId: data.dependsOnGoalId,
                dependencyType: data.dependencyType || 'ContributesTo',
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.GOAL_DEPENDENCY_CREATED, {
            dependencyId: dependency.id,
            goalId: data.goalId,
            dependsOnGoalId: data.dependsOnGoalId,
            dependencyType: dependency.dependencyType,
        });
        this.logger.log(`Goal dependency created: ${data.goalId} → ${data.dependsOnGoalId} (${dependency.dependencyType})`);
        return dependency;
    }
    async getDependencyTree(tenantId, goalId, depth = 10) {
        if (depth <= 0)
            return [];
        const children = await this.prisma.perfGoalDependency.findMany({
            where: { tenantId, dependsOnGoalId: goalId },
        });
        const tree = [];
        for (const child of children) {
            const subtree = await this.getDependencyTree(tenantId, child.goalId, depth - 1);
            tree.push({
                dependencyId: child.id,
                goalId: child.goalId,
                dependencyType: child.dependencyType,
                children: subtree,
            });
        }
        return tree;
    }
    async getUpstreamDependencies(tenantId, goalId) {
        return this.prisma.perfGoalDependency.findMany({
            where: { tenantId, goalId },
        });
    }
    async detectCycle(tenantId, startGoalId, targetGoalId, visited = new Set()) {
        if (startGoalId === targetGoalId)
            return true;
        if (visited.has(startGoalId))
            return false;
        visited.add(startGoalId);
        const deps = await this.prisma.perfGoalDependency.findMany({
            where: { tenantId, goalId: startGoalId },
        });
        for (const dep of deps) {
            if (await this.detectCycle(tenantId, dep.dependsOnGoalId, targetGoalId, visited)) {
                return true;
            }
        }
        return false;
    }
};
exports.GoalDependencyService = GoalDependencyService;
exports.GoalDependencyService = GoalDependencyService = GoalDependencyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], GoalDependencyService);
//# sourceMappingURL=goal-dependency.service.js.map