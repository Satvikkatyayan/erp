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
var DevelopmentRecommendationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevelopmentRecommendationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let DevelopmentRecommendationService = DevelopmentRecommendationService_1 = class DevelopmentRecommendationService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(DevelopmentRecommendationService_1.name);
    }
    async generateRecommendations(ctx, cycleId, employeeId) {
        this.logger.log(`Generating development recommendations for employee ${employeeId}`);
        const assignments = await this.prisma.perfCompetencyAssignment.findMany({
            where: { employeeId, tenantId: ctx.tenantId },
            include: { competency: true },
        });
        const recommendations = [];
        for (const assignment of assignments) {
            const targetLevel = assignment.targetLevel || 5;
            const currentLevel = assignment.currentLevel || 0;
            const gap = targetLevel - currentLevel;
            if (gap <= 0)
                continue;
            const priority = this.assessPriority(gap);
            const recommendationType = this.suggestActionType(gap, assignment.competency.name);
            const rec = await this.prisma.perfDevelopmentRecommendation.create({
                data: {
                    tenantId: ctx.tenantId,
                    cycleId,
                    employeeId,
                    competencyId: assignment.competencyId,
                    skillGap: gap,
                    recommendationType,
                    priority,
                    description: `Develop ${assignment.competency.name}: current level ${currentLevel}, target level ${targetLevel}. Recommended: ${recommendationType}.`,
                    status: 'GENERATED',
                },
            });
            recommendations.push(rec);
        }
        if (recommendations.length > 0) {
            await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.DEVELOPMENT_RECOMMENDATION_GENERATED, {
                cycleId,
                employeeId,
                recommendationCount: recommendations.length,
                recommendations: recommendations.map(r => ({
                    id: r.id,
                    competencyId: r.competencyId,
                    type: r.recommendationType,
                    priority: r.priority,
                    skillGap: r.skillGap,
                })),
            });
        }
        this.logger.log(`Generated ${recommendations.length} development recommendations`);
        return recommendations;
    }
    assessPriority(gap) {
        if (gap >= 3)
            return 'CRITICAL';
        if (gap >= 2)
            return 'HIGH';
        if (gap >= 1)
            return 'MEDIUM';
        return 'LOW';
    }
    suggestActionType(gap, competencyName) {
        if (gap >= 3)
            return 'Training';
        if (gap >= 2)
            return 'Mentoring';
        if (competencyName.toLowerCase().includes('leadership'))
            return 'Coaching';
        if (competencyName.toLowerCase().includes('technical'))
            return 'Certification';
        return 'StretchAssignment';
    }
};
exports.DevelopmentRecommendationService = DevelopmentRecommendationService;
exports.DevelopmentRecommendationService = DevelopmentRecommendationService = DevelopmentRecommendationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], DevelopmentRecommendationService);
//# sourceMappingURL=development-recommendation.service.js.map