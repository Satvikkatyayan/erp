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
exports.LeaveQueryService = void 0;
const common_1 = require("@nestjs/common");
const leave_request_repository_1 = require("../repositories/leave-request.repository");
const leave_balance_repository_1 = require("../repositories/leave-balance.repository");
const leave_policy_repository_1 = require("../repositories/leave-policy.repository");
const timeline_repository_1 = require("../repositories/timeline.repository");
const snapshot_repository_1 = require("../repositories/snapshot.repository");
let LeaveQueryService = class LeaveQueryService {
    constructor(leaveRequestRepo, leaveBalanceRepo, leavePolicyRepo, timelineRepo, snapshotRepo) {
        this.leaveRequestRepo = leaveRequestRepo;
        this.leaveBalanceRepo = leaveBalanceRepo;
        this.leavePolicyRepo = leavePolicyRepo;
        this.timelineRepo = timelineRepo;
        this.snapshotRepo = snapshotRepo;
    }
    async getLeaveRequest(tenantId, id) {
        return this.leaveRequestRepo.findLeaveRequestById(tenantId, id);
    }
    async searchLeaveRequests(tenantId, filters, sort) {
        return this.leaveRequestRepo.searchLeaveRequests(tenantId, filters, sort);
    }
    async getLeaveBalances(tenantId, employeeId) {
        return this.leaveBalanceRepo.findEmployeeLeaveBalance(tenantId, employeeId);
    }
    async getLeaveTimeline(tenantId, leaveRequestId) {
        return this.timelineRepo.getTimeline(tenantId, leaveRequestId);
    }
    async getLeaveSnapshotHistory(tenantId, leaveRequestId) {
        return this.snapshotRepo.getSnapshotHistory(tenantId, leaveRequestId);
    }
    async getLeavePolicies(tenantId, filters, sort) {
        return this.leavePolicyRepo.listLeavePolicies(tenantId, filters, sort);
    }
};
exports.LeaveQueryService = LeaveQueryService;
exports.LeaveQueryService = LeaveQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leave_request_repository_1.LeaveRequestRepository,
        leave_balance_repository_1.LeaveBalanceRepository,
        leave_policy_repository_1.LeavePolicyRepository,
        timeline_repository_1.LeaveTimelineRepository,
        snapshot_repository_1.LeaveSnapshotRepository])
], LeaveQueryService);
//# sourceMappingURL=leave-query.service.js.map