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
var ReviewTemplateService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewTemplateService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const performance_events_1 = require("../events/performance.events");
let ReviewTemplateService = ReviewTemplateService_1 = class ReviewTemplateService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(ReviewTemplateService_1.name);
    }
    async createTemplate(ctx, data) {
        const template = await this.prisma.perfReviewTemplate.create({
            data: {
                tenantId: ctx.tenantId,
                organizationId: ctx.organizationId,
                name: data.name,
                description: data.description,
                status: 'ACTIVE',
            },
        });
        this.logger.log(`Review template created: ${template.id} (${template.name})`);
        return template;
    }
    async createVersion(ctx, templateId, data) {
        const maxVersion = await this.prisma.perfReviewTemplateVersion.aggregate({
            where: { templateId, tenantId: ctx.tenantId },
            _max: { versionNumber: true },
        });
        const newVersionNumber = (maxVersion._max.versionNumber || 0) + 1;
        const version = await this.prisma.perfReviewTemplateVersion.create({
            data: {
                tenantId: ctx.tenantId,
                templateId,
                versionNumber: newVersionNumber,
                status: 'DRAFT',
                sectionsConfig: data.sectionsConfig,
                effectiveFrom: data.effectiveFrom,
            },
        });
        this.logger.log(`Template version created: ${templateId} V${newVersionNumber} (DRAFT)`);
        return version;
    }
    async publishVersion(ctx, versionId) {
        const version = await this.prisma.perfReviewTemplateVersion.findFirst({
            where: { id: versionId, tenantId: ctx.tenantId },
        });
        if (!version) {
            throw new common_1.BadRequestException('Template version not found');
        }
        if (version.status !== 'DRAFT') {
            throw new common_1.BadRequestException('Only DRAFT versions can be published');
        }
        await this.prisma.perfReviewTemplateVersion.updateMany({
            where: { templateId: version.templateId, tenantId: ctx.tenantId, status: 'PUBLISHED' },
            data: { status: 'ARCHIVED' },
        });
        const published = await this.prisma.perfReviewTemplateVersion.update({
            where: { id: versionId },
            data: { status: 'PUBLISHED' },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.REVIEW_TEMPLATE_VERSION_ACTIVATED, {
            templateId: version.templateId,
            versionId,
            versionNumber: version.versionNumber,
        });
        this.logger.log(`Template version published: ${versionId} (V${version.versionNumber})`);
        return published;
    }
    async assignToReview(ctx, reviewId, templateVersionId) {
        await this.prisma.perfReview.update({
            where: { id: reviewId },
            data: { templateVersionId },
        });
        await this.sdk.events.publish(ctx, performance_events_1.PERFORMANCE_EVENTS.REVIEW_TEMPLATE_ASSIGNED, {
            reviewId,
            templateVersionId,
        });
        this.logger.log(`Template version ${templateVersionId} assigned to review ${reviewId}`);
    }
    async getActiveVersion(tenantId, templateId) {
        return this.prisma.perfReviewTemplateVersion.findFirst({
            where: { templateId, tenantId, status: 'PUBLISHED' },
            orderBy: { versionNumber: 'desc' },
        });
    }
};
exports.ReviewTemplateService = ReviewTemplateService;
exports.ReviewTemplateService = ReviewTemplateService = ReviewTemplateService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], ReviewTemplateService);
//# sourceMappingURL=review-template.service.js.map