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
var NineBoxService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NineBoxService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let NineBoxService = NineBoxService_1 = class NineBoxService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(NineBoxService_1.name);
    }
    async assessPotential(ctx, data) {
        const assessment = await this.prisma.perfPotentialAssessment.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId: data.employeeId,
                cycleId: data.cycleId,
                potentialScore: data.potentialScore,
                assessedBy: ctx.userId,
            },
        });
        this.logger.log(`Potential assessed: employee=${data.employeeId}, score=${data.potentialScore}`);
        return assessment;
    }
    async calculatePlacement(ctx, cycleId, employeeId) {
        const rating = await this.prisma.perfRating.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        const potential = await this.prisma.perfPotentialAssessment.findFirst({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
            orderBy: { assessedAt: 'desc' },
        });
        if (!rating || !potential) {
            throw new Error('Both performance rating and potential assessment are required for nine-box placement');
        }
        const performanceScore = rating.overallScore;
        const potentialScore = potential.potentialScore;
        const boxLabel = this.computeBoxLabel(performanceScore, potentialScore);
        await this.prisma.perfNineBoxPlacement.deleteMany({
            where: { cycleId, employeeId, tenantId: ctx.tenantId },
        });
        const placement = await this.prisma.perfNineBoxPlacement.create({
            data: {
                tenantId: ctx.tenantId,
                employeeId,
                cycleId,
                performanceScore,
                potentialScore,
                boxLabel,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.NINE_BOX_PLACEMENT_CALCULATED, {
            placementId: placement.id,
            employeeId,
            cycleId,
            performanceScore,
            potentialScore,
            boxLabel,
        });
        this.logger.log(`Nine-box placement: employee=${employeeId}, box=${boxLabel}`);
        return placement;
    }
    async getMatrix(tenantId, cycleId) {
        return this.prisma.perfNineBoxPlacement.findMany({
            where: { tenantId, cycleId },
        });
    }
    computeBoxLabel(performance, potential) {
        const perfLevel = performance >= 80 ? 'high' : performance >= 60 ? 'medium' : 'low';
        const potLevel = potential >= 80 ? 'high' : potential >= 60 ? 'medium' : 'low';
        const matrix = {
            high: {
                high: 'Star',
                medium: 'High Performer',
                low: 'Inconsistent Player',
            },
            medium: {
                high: 'High Potential',
                medium: 'Core Player',
                low: 'Effective',
            },
            low: {
                high: 'Potential Gem',
                medium: 'Dilemma',
                low: 'Under Performer',
            },
        };
        return matrix[perfLevel][potLevel];
    }
};
exports.NineBoxService = NineBoxService;
exports.NineBoxService = NineBoxService = NineBoxService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], NineBoxService);
//# sourceMappingURL=nine-box.service.js.map