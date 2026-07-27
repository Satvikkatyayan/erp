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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeavePolicyService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const uuid_1 = require("uuid");
const leave_balance_service_1 = require("./leave-balance.service");
let LeavePolicyService = class LeavePolicyService {
    constructor(prisma, sdk, balanceService) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.balanceService = balanceService;
    }
    async assignPolicy(ctx, employeeId, leavePolicyId, effectiveFrom) {
        const assignment = await this.prisma.levLeavePolicyAssignment.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                employeeId,
                leavePolicyId,
                effectiveFrom
            }
        });
        await this.sdk.events.publish(ctx, 'LeavePolicyAssigned', { employeeId, leavePolicyId });
        return assignment;
    }
    async applyProbationTransition(ctx, employeeId, plTypeId, clTypeId) {
        await this.balanceService.allocateEntitlement(ctx, employeeId, plTypeId, 15, new Date());
        await this.balanceService.allocateEntitlement(ctx, employeeId, clTypeId, 12, new Date());
    }
};
exports.LeavePolicyService = LeavePolicyService;
exports.LeavePolicyService = LeavePolicyService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, platform_sdk_1.PlatformSDK, leave_balance_service_1.LeaveBalanceService])
], LeavePolicyService);
//# sourceMappingURL=leave-policy.service.js.map