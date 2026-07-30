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
exports.EmployeeAssignmentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const employee_mapper_1 = require("../api/mappers/employee.mapper");
const get_current_assignment_query_1 = require("../queries/get-current-assignment.query");
const get_assignment_history_query_1 = require("../queries/get-assignment-history.query");
const get_current_assignment_handler_1 = require("../queries/handlers/get-current-assignment.handler");
const get_assignment_history_handler_1 = require("../queries/handlers/get-assignment-history.handler");
let EmployeeAssignmentController = class EmployeeAssignmentController {
    constructor(mapper, currentAssignmentHandler, assignmentHistoryHandler) {
        this.mapper = mapper;
        this.currentAssignmentHandler = currentAssignmentHandler;
        this.assignmentHistoryHandler = assignmentHistoryHandler;
    }
    async getCurrentAssignment(tenantId, employeeId) {
        const query = new get_current_assignment_query_1.GetCurrentAssignmentQuery(tenantId, employeeId);
        const result = await this.currentAssignmentHandler.execute(query);
        return this.mapper.success(result.data, 'Current assignment retrieved');
    }
    async getAssignmentHistory(tenantId, employeeId) {
        const query = new get_assignment_history_query_1.GetAssignmentHistoryQuery(tenantId, employeeId);
        const result = await this.assignmentHistoryHandler.execute(query);
        return this.mapper.success(result.data, 'Assignment history retrieved');
    }
};
exports.EmployeeAssignmentController = EmployeeAssignmentController;
__decorate([
    (0, common_1.Get)(':id/assignment'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current assignment' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Current assignment returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeAssignmentController.prototype, "getCurrentAssignment", null);
__decorate([
    (0, common_1.Get)(':id/assignment/history'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get assignment history' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Assignment history returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeAssignmentController.prototype, "getAssignmentHistory", null);
exports.EmployeeAssignmentController = EmployeeAssignmentController = __decorate([
    (0, swagger_1.ApiTags)('Employee Assignment'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_mapper_1.EmployeeMapper,
        get_current_assignment_handler_1.GetCurrentAssignmentHandler,
        get_assignment_history_handler_1.GetAssignmentHistoryHandler])
], EmployeeAssignmentController);
//# sourceMappingURL=employee-assignment.controller.js.map