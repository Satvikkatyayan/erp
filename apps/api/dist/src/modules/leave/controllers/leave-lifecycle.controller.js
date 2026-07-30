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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveLifecycleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const requests_dto_1 = require("../api/dtos/requests.dto");
const leave_mapper_1 = require("../api/mappers/leave.mapper");
const apply_leave_handler_1 = require("../commands/handlers/apply-leave.handler");
const approve_leave_handler_1 = require("../commands/handlers/approve-leave.handler");
const reject_leave_handler_1 = require("../commands/handlers/reject-leave.handler");
const cancel_leave_handler_1 = require("../commands/handlers/cancel-leave.handler");
const apply_leave_command_1 = require("../commands/apply-leave.command");
const approve_leave_command_1 = require("../commands/approve-leave.command");
const reject_leave_command_1 = require("../commands/reject-leave.command");
const cancel_leave_command_1 = require("../commands/cancel-leave.command");
let LeaveLifecycleController = class LeaveLifecycleController {
    constructor(mapper, applyLeaveHandler, approveLeaveHandler, rejectLeaveHandler, cancelLeaveHandler) {
        this.mapper = mapper;
        this.applyLeaveHandler = applyLeaveHandler;
        this.approveLeaveHandler = approveLeaveHandler;
        this.rejectLeaveHandler = rejectLeaveHandler;
        this.cancelLeaveHandler = cancelLeaveHandler;
    }
    async applyLeave(tenantId, payload) {
        const command = new apply_leave_command_1.ApplyLeaveCommand(tenantId, payload);
        await this.applyLeaveHandler.execute(command);
        return this.mapper.success(null, 'Leave request applied successfully');
    }
    async approveLeave(tenantId, id, payload) {
        const command = new approve_leave_command_1.ApproveLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
        await this.approveLeaveHandler.execute(command);
        return this.mapper.success(null, 'Leave request approved successfully');
    }
    async rejectLeave(tenantId, id, payload) {
        const command = new reject_leave_command_1.RejectLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
        await this.rejectLeaveHandler.execute(command);
        return this.mapper.success(null, 'Leave request rejected successfully');
    }
    async cancelLeave(tenantId, id, payload) {
        const command = new cancel_leave_command_1.CancelLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
        await this.cancelLeaveHandler.execute(command);
        return this.mapper.success(null, 'Leave request cancelled successfully');
    }
};
exports.LeaveLifecycleController = LeaveLifecycleController;
__decorate([
    (0, common_1.Post)('apply'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:apply'),
    (0, common_1.HttpCode)(201),
    (0, swagger_1.ApiOperation)({ summary: 'Apply for a new leave request' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Leave request applied successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requests_dto_1.ApplyLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveLifecycleController.prototype, "applyLeave", null);
__decorate([
    (0, common_1.Post)(':id/approve'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:approve'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Approve an existing leave request' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request approved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave Request not found' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.ApproveLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveLifecycleController.prototype, "approveLeave", null);
__decorate([
    (0, common_1.Post)(':id/reject'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:reject'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Reject an existing leave request' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request rejected successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave Request not found' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.RejectLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveLifecycleController.prototype, "rejectLeave", null);
__decorate([
    (0, common_1.Post)(':id/cancel'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:cancel'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel an existing leave request' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Leave request cancelled successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave Request not found' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.CancelLeaveRequestDto]),
    __metadata("design:returntype", Promise)
], LeaveLifecycleController.prototype, "cancelLeave", null);
exports.LeaveLifecycleController = LeaveLifecycleController = __decorate([
    (0, swagger_1.ApiTags)('Leave Lifecycle'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('leave'),
    __metadata("design:paramtypes", [leave_mapper_1.LeaveMapper,
        apply_leave_handler_1.ApplyLeaveHandler,
        approve_leave_handler_1.ApproveLeaveHandler,
        reject_leave_handler_1.RejectLeaveHandler,
        cancel_leave_handler_1.CancelLeaveHandler])
], LeaveLifecycleController);
//# sourceMappingURL=leave-lifecycle.controller.js.map