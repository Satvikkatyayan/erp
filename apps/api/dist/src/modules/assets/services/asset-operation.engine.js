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
var AssetOperationEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetOperationEngine = void 0;
const common_1 = require("@nestjs/common");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const asset_timeline_service_1 = require("./asset-timeline.service");
const assignment_service_1 = require("./assignment.service");
let AssetOperationEngine = AssetOperationEngine_1 = class AssetOperationEngine {
    constructor(prisma, timeline, assignmentService, sdk) {
        this.prisma = prisma;
        this.timeline = timeline;
        this.assignmentService = assignmentService;
        this.sdk = sdk;
        this.logger = new common_1.Logger(AssetOperationEngine_1.name);
    }
    async executeTransition(ctx, assetId, operation, payload, actorId) {
        this.logger.debug(`Executing ${operation} on asset ${assetId}`);
        const asset = await this.prisma.asset.findUnique({ where: { id: assetId } });
        if (!asset)
            throw new common_1.BadRequestException('Asset not found');
        let result;
        if (operation === 'Assign') {
            result = await this.assignmentService.assignAsset(ctx, assetId, payload.employeeId, actorId);
        }
        else if (operation === 'Return') {
            result = await this.assignmentService.returnAsset(ctx, payload.assignmentId, payload.employeeId, payload.condition, actorId);
        }
        else {
            result = { success: true, operation };
        }
        await this.timeline.logEvent(ctx, assetId, `Asset${operation}ed`, payload, actorId);
        await this.createSnapshot(ctx, assetId, operation.toUpperCase(), result);
        await this.sdk.events.publish(ctx, `Asset${operation}ed`, { assetId, result });
        return result;
    }
    async createSnapshot(ctx, assetId, snapshotType, resultData) {
        const asset = await this.prisma.asset.findUnique({
            where: { id: assetId },
            include: { configurations: true, identifiers: true }
        });
        if (!asset)
            return;
        await this.prisma.assetSnapshot.create({
            data: {
                tenantId: ctx.tenantId,
                assetId,
                snapshotType,
                assetData: asset,
                assignmentData: resultData,
            }
        });
    }
};
exports.AssetOperationEngine = AssetOperationEngine;
exports.AssetOperationEngine = AssetOperationEngine = AssetOperationEngine_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        asset_timeline_service_1.AssetTimelineService,
        assignment_service_1.AssignmentService,
        platform_sdk_1.PlatformSDK])
], AssetOperationEngine);
//# sourceMappingURL=asset-operation.engine.js.map