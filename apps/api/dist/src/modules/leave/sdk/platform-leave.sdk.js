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
exports.PlatformLeaveSDK = void 0;
const common_1 = require("@nestjs/common");
const leave_query_service_1 = require("../services/leave-query.service");
let PlatformLeaveSDK = class PlatformLeaveSDK {
    constructor(queryService) {
        this.queryService = queryService;
    }
    async getLeaveRequest(tenantId, id) {
        const raw = await this.queryService.getLeaveRequest(tenantId, id);
        if (!raw)
            return null;
        return {
            id: raw.id,
            tenantId: raw.tenantId,
            employeeId: raw.employeeId,
            leaveNumber: raw.leaveNumber,
            status: raw.status,
            startDate: raw.startDate,
            endDate: raw.endDate,
            typeId: raw.typeId,
            reason: raw.reason
        };
    }
    async searchLeaveRequests(tenantId, filters, sort) {
        const rawList = await this.queryService.searchLeaveRequests(tenantId, filters, sort);
        return rawList.map(raw => ({
            id: raw.id,
            tenantId: raw.tenantId,
            employeeId: raw.employeeId,
            leaveNumber: raw.leaveNumber,
            status: raw.status,
            startDate: raw.startDate,
            endDate: raw.endDate,
            typeId: raw.typeId,
            reason: raw.reason
        }));
    }
    async getLeaveBalances(tenantId, employeeId) {
        const rawList = await this.queryService.getLeaveBalances(tenantId, employeeId);
        return rawList.map(raw => ({
            id: raw.id,
            tenantId: raw.tenantId,
            employeeId: raw.employeeId,
            leaveTypeId: raw.leaveTypeId,
            allocated: raw.allocated,
            used: raw.used,
            available: raw.available
        }));
    }
    async getLeaveTimeline(tenantId, leaveRequestId) {
        const rawList = await this.queryService.getLeaveTimeline(tenantId, leaveRequestId);
        return rawList.map(raw => ({
            id: raw.id,
            eventType: raw.transactionType || raw.eventType,
            eventDate: raw.createdAt || raw.eventDate,
            metadata: raw.metadata
        }));
    }
    async getLeaveSnapshotHistory(tenantId, leaveRequestId) {
        const rawList = await this.queryService.getLeaveSnapshotHistory(tenantId, leaveRequestId);
        return rawList.map(raw => ({
            id: raw.id,
            leaveRequestId: raw.leaveRequestId,
            payload: raw.payload,
            generatedAt: raw.generatedAt
        }));
    }
    async getLeavePolicies(tenantId, filters, sort) {
        const rawList = await this.queryService.getLeavePolicies(tenantId, filters, sort);
        return rawList.map(raw => ({
            id: raw.id,
            tenantId: raw.tenantId,
            name: raw.name,
            description: raw.description
        }));
    }
};
exports.PlatformLeaveSDK = PlatformLeaveSDK;
exports.PlatformLeaveSDK = PlatformLeaveSDK = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leave_query_service_1.LeaveQueryService])
], PlatformLeaveSDK);
//# sourceMappingURL=platform-leave.sdk.js.map