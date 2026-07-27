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
var KpiService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KpiService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let KpiService = KpiService_1 = class KpiService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(KpiService_1.name);
    }
    async createKPI(ctx, data) {
        const kpi = await this.prisma.perfKPI.create({
            data: {
                tenantId: ctx.tenantId,
                name: data.name,
                code: data.code,
                unit: data.unit,
                targetValue: data.targetValue,
            },
        });
        this.logger.log(`KPI created: ${kpi.code} (${kpi.name})`);
        return kpi;
    }
    async assignKPI(ctx, data) {
        const assignment = await this.prisma.perfKPIAssignment.create({
            data: {
                tenantId: ctx.tenantId,
                kpiId: data.kpiId,
                employeeId: data.employeeId,
                cycleId: data.cycleId,
                targetValue: data.targetValue,
            },
        });
        return assignment;
    }
    async recordResult(ctx, assignmentId, actualValue) {
        const assignment = await this.prisma.perfKPIAssignment.findFirst({
            where: { id: assignmentId, tenantId: ctx.tenantId },
        });
        if (!assignment) {
            throw new Error('KPI assignment not found');
        }
        const achievementPct = assignment.targetValue > 0
            ? (actualValue / assignment.targetValue) * 100
            : 0;
        const result = await this.prisma.perfKPIResult.create({
            data: {
                tenantId: ctx.tenantId,
                assignmentId,
                actualValue,
                achievementPct,
            },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.KPI_COMPLETED, {
            resultId: result.id,
            assignmentId,
            actualValue,
            targetValue: assignment.targetValue,
            achievementPct,
        });
        this.logger.log(`KPI result recorded: assignment=${assignmentId}, achievement=${achievementPct.toFixed(1)}%`);
        return result;
    }
};
exports.KpiService = KpiService;
exports.KpiService = KpiService = KpiService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], KpiService);
//# sourceMappingURL=kpi.service.js.map