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
var LeaveBalanceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveBalanceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const uuid_1 = require("uuid");
let LeaveBalanceService = LeaveBalanceService_1 = class LeaveBalanceService {
    constructor(prisma, sdk) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.logger = new common_1.Logger(LeaveBalanceService_1.name);
    }
    async bookLeaveTransaction(ctx, employeeId, leaveTypeId, transactionType, units, referenceId) {
        const ledger = await this.prisma.levLeaveLedger.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                employeeId,
                leaveTypeId,
                transactionType,
                units,
                referenceId
            }
        });
        let balance = await this.prisma.levLeaveBalance.findUnique({
            where: { employeeId_leaveTypeId: { employeeId, leaveTypeId } }
        });
        if (!balance) {
            balance = await this.prisma.levLeaveBalance.create({
                data: {
                    id: (0, uuid_1.v4)(),
                    tenantId: ctx.tenantId,
                    employeeId,
                    leaveTypeId,
                    totalAccrued: units > 0 ? units : 0,
                    totalConsumed: units < 0 ? Math.abs(units) : 0,
                    currentBalance: units
                }
            });
        }
        else {
            const updateData = { currentBalance: { increment: units } };
            if (units > 0 && transactionType !== 'Adjustment')
                updateData.totalAccrued = { increment: units };
            if (units < 0)
                updateData.totalConsumed = { increment: Math.abs(units) };
            balance = await this.prisma.levLeaveBalance.update({
                where: { id: balance.id },
                data: updateData
            });
        }
        await this.sdk.events.publish(ctx, 'LeaveBalanceCalculated', { employeeId, leaveTypeId, currentBalance: balance.currentBalance });
        return balance;
    }
    async allocateEntitlement(ctx, employeeId, leaveTypeId, units, validFrom, validTo) {
        const entitlement = await this.prisma.levLeaveEntitlement.create({
            data: {
                id: (0, uuid_1.v4)(),
                tenantId: ctx.tenantId,
                employeeId,
                leaveTypeId,
                entitledUnits: units,
                validFrom,
                validTo
            }
        });
        await this.bookLeaveTransaction(ctx, employeeId, leaveTypeId, 'Allocation', units, entitlement.id);
        return entitlement;
    }
};
exports.LeaveBalanceService = LeaveBalanceService;
exports.LeaveBalanceService = LeaveBalanceService = LeaveBalanceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK])
], LeaveBalanceService);
//# sourceMappingURL=leave-balance.service.js.map