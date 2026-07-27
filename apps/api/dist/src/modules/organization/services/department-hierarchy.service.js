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
var DepartmentHierarchyService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentHierarchyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const platform_error_1 = require("../../../core/contracts/errors/platform.error");
let DepartmentHierarchyService = DepartmentHierarchyService_1 = class DepartmentHierarchyService {
    constructor(prisma, platform) {
        this.prisma = prisma;
        this.platform = platform;
        this.logger = new common_1.Logger(DepartmentHierarchyService_1.name);
    }
    async detectCycle(tenantId, departmentId, newParentId) {
        let currentId = newParentId;
        while (currentId) {
            if (currentId === departmentId)
                return true;
            const current = await this.prisma.department.findUnique({
                where: { id: currentId },
                select: { parentId: true }
            });
            currentId = current?.parentId || null;
        }
        return false;
    }
    async moveDepartment(ctx, departmentId, newParentId) {
        return this.platform.pipeline.execute(ctx, 'OrganizationModule', 'moveDepartment', async () => {
            const isCycle = await this.detectCycle(ctx.tenantId, departmentId, newParentId);
            if (isCycle) {
                throw new platform_error_1.ValidationError('Cyclic reference detected in department hierarchy', ctx.correlationId, { departmentId, newParentId });
            }
            const dept = await this.prisma.department.update({
                where: { id: departmentId },
                data: { parentId: newParentId }
            });
            return dept;
        });
    }
};
exports.DepartmentHierarchyService = DepartmentHierarchyService;
exports.DepartmentHierarchyService = DepartmentHierarchyService = DepartmentHierarchyService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], DepartmentHierarchyService);
//# sourceMappingURL=department-hierarchy.service.js.map