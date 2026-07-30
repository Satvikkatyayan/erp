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
exports.LeaveExecutionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../common/prisma/prisma.service");
const platform_sdk_1 = require("../../../core/sdk/platform.sdk");
const leave_request_repository_1 = require("../repositories/leave-request.repository");
const leave_balance_repository_1 = require("../repositories/leave-balance.repository");
const leave_policy_repository_1 = require("../repositories/leave-policy.repository");
const timeline_repository_1 = require("../repositories/timeline.repository");
const snapshot_repository_1 = require("../repositories/snapshot.repository");
const execution_result_1 = require("../../../core/cqrs/execution-result");
let LeaveExecutionService = class LeaveExecutionService {
    constructor(prisma, sdk, leaveRequestRepo, leaveBalanceRepo, leavePolicyRepo, timelineRepo, snapshotRepo) {
        this.prisma = prisma;
        this.sdk = sdk;
        this.leaveRequestRepo = leaveRequestRepo;
        this.leaveBalanceRepo = leaveBalanceRepo;
        this.leavePolicyRepo = leavePolicyRepo;
        this.timelineRepo = timelineRepo;
        this.snapshotRepo = snapshotRepo;
    }
    async applyLeave(command) {
        return this.prisma.$transaction(async (tx) => {
            const payload = { ...command.data, status: 'PENDING' };
            const leaveRequest = await this.leaveRequestRepo.createLeaveRequest(command.tenantId, payload, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, leaveRequest.id, 'APPLIED', 'system', command.data, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, leaveRequest.id, { leaveRequest }, tx);
            const events = [];
            return new execution_result_1.ExecutionResult({ leaveRequest, timeline, snapshot }, events);
        });
    }
    async approveLeave(command) {
        return this.prisma.$transaction(async (tx) => {
            const id = command.data.leaveRequestId;
            await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'APPROVED' }, tx);
            const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'APPROVED', 'system', command.data, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
            const events = [];
            return new execution_result_1.ExecutionResult({ leaveRequest, timeline, snapshot }, events);
        });
    }
    async rejectLeave(command) {
        return this.prisma.$transaction(async (tx) => {
            const id = command.data.leaveRequestId;
            await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'REJECTED' }, tx);
            const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'REJECTED', 'system', command.data, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
            const events = [];
            return new execution_result_1.ExecutionResult({ leaveRequest, timeline, snapshot }, events);
        });
    }
    async cancelLeave(command) {
        return this.prisma.$transaction(async (tx) => {
            const id = command.data.leaveRequestId;
            await this.leaveRequestRepo.updateLeaveRequest(command.tenantId, id, { status: 'CANCELLED' }, tx);
            const leaveRequest = await this.leaveRequestRepo.findLeaveRequestById(command.tenantId, id, tx);
            const timeline = await this.timelineRepo.createTimelineEntry(command.tenantId, id, 'CANCELLED', 'system', command.data, tx);
            const snapshot = await this.snapshotRepo.createSnapshot(command.tenantId, id, { leaveRequest }, tx);
            const events = [];
            return new execution_result_1.ExecutionResult({ leaveRequest, timeline, snapshot }, events);
        });
    }
};
exports.LeaveExecutionService = LeaveExecutionService;
exports.LeaveExecutionService = LeaveExecutionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        platform_sdk_1.PlatformSDK,
        leave_request_repository_1.LeaveRequestRepository,
        leave_balance_repository_1.LeaveBalanceRepository,
        leave_policy_repository_1.LeavePolicyRepository,
        timeline_repository_1.LeaveTimelineRepository,
        snapshot_repository_1.LeaveSnapshotRepository])
], LeaveExecutionService);
//# sourceMappingURL=leave-execution.service.js.map