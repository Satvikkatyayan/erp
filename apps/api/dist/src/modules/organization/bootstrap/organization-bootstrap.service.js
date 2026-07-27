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
var OrganizationBootstrapService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationBootstrapService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
let OrganizationBootstrapService = OrganizationBootstrapService_1 = class OrganizationBootstrapService {
    constructor(prisma, platform) {
        this.prisma = prisma;
        this.platform = platform;
        this.logger = new common_1.Logger(OrganizationBootstrapService_1.name);
    }
    async bootstrapNewOrganization(ctx, orgId) {
        return this.platform.pipeline.execute(ctx, 'OrganizationModule', 'bootstrapOrganization', async () => {
            const org = await this.prisma.organization.findUnique({ where: { id: orgId } });
            if (!org)
                throw new Error('Organization not found');
            const settings = await this.prisma.orgSettingsSnapshot.create({
                data: {
                    tenantId: ctx.tenantId,
                    organizationId: orgId,
                    version: 1,
                    payload: {
                        dateFormat: 'YYYY-MM-DD',
                        timezone: org.timezone || 'UTC',
                        currency: org.currencyCode || 'USD',
                        weekendRules: [0, 6]
                    }
                }
            });
            const branch = await this.prisma.branch.create({
                data: {
                    tenantId: ctx.tenantId,
                    organizationId: orgId,
                    code: 'HQ',
                    name: 'Headquarters',
                    timezone: org.timezone || 'UTC'
                }
            });
            this.logger.log(`[${ctx.correlationId}] Organization ${org.code} bootstrapped successfully.`);
            return { settings, branch };
        });
    }
};
exports.OrganizationBootstrapService = OrganizationBootstrapService;
exports.OrganizationBootstrapService = OrganizationBootstrapService = OrganizationBootstrapService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], OrganizationBootstrapService);
//# sourceMappingURL=organization-bootstrap.service.js.map