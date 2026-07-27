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
var LeaveLifecycleService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveLifecycleService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const leave_balance_service_1 = require("./leave-balance.service");
const uuid_1 = require("uuid");
let LeaveLifecycleService = LeaveLifecycleService_1 = class LeaveLifecycleService {
    constructor(prisma, sdk, balanceService) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.balanceService = balanceService;
        this.logger = new common_1.Logger(LeaveLifecycleService_1.name);
    }
    async requestLeave(ctx, employeeId, leaveTypeId, startDate, endDate, units, reason) {
        this.logger.log(`Requesting ${units} leave units for employee ${employeeId}`);
        const request = await this.prisma.levLeaveRequest.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                employeeId,
                leaveTypeId,
                startDate,
                endDate,
                leaveUnits: units,
                reason,
                status: 'Submitted'
            }
        });
        await this.prisma.levLeaveTimeline.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                leaveRequestId: request.id,
                eventType: 'LeaveSubmitted',
                actorId: ctx.userId
            }
        });
        await this.sdk.events.publish(ctx, 'LeaveRequested', { requestId: request.id, employeeId });
        return request;
    }
    async approveLeave(ctx, requestId, approverId) {
        const request = await this.prisma.levLeaveRequest.findUniqueOrThrow({ where: { id: requestId } });
        const updated = await this.prisma.levLeaveRequest.update({
            where: { id: requestId },
            data: { status: 'Approved' }
        });
        await this.prisma.levLeaveApproval.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                leaveRequestId: request.id,
                approverId,
                level: 1,
                status: 'Approved',
                approvedAt: new Date()
            }
        });
        await this.balanceService.bookLeaveTransaction(ctx, request.employeeId, request.leaveTypeId, 'Consumption', -request.leaveUnits, request.id);
        await this.prisma.levLeaveTimeline.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                leaveRequestId: request.id,
                eventType: 'LeaveApproved',
                actorId: approverId
            }
        });
        await this.sdk.events.publish(ctx, 'LeaveApproved', { requestId: request.id });
        return updated;
    }
};
exports.LeaveLifecycleService = LeaveLifecycleService;
exports.LeaveLifecycleService = LeaveLifecycleService = LeaveLifecycleService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        leave_balance_service_1.LeaveBalanceService])
], LeaveLifecycleService);
//# sourceMappingURL=leave-lifecycle.service.js.map