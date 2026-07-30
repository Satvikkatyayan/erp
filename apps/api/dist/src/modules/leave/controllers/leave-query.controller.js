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
exports.LeaveQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const queries_dto_1 = require("../api/dtos/queries.dto");
const leave_mapper_1 = require("../api/mappers/leave.mapper");
const get_leave_request_handler_1 = require("../queries/handlers/get-leave-request.handler");
const search_leave_requests_handler_1 = require("../queries/handlers/search-leave-requests.handler");
const get_leave_balances_handler_1 = require("../queries/handlers/get-leave-balances.handler");
const get_leave_request_query_1 = require("../queries/get-leave-request.query");
const search_leave_requests_query_1 = require("../queries/search-leave-requests.query");
const get_leave_balances_query_1 = require("../queries/get-leave-balances.query");
let LeaveQueryController = class LeaveQueryController {
    constructor(mapper, getLeaveRequestHandler, searchLeaveRequestsHandler, getLeaveBalancesHandler) {
        this.mapper = mapper;
        this.getLeaveRequestHandler = getLeaveRequestHandler;
        this.searchLeaveRequestsHandler = searchLeaveRequestsHandler;
        this.getLeaveBalancesHandler = getLeaveBalancesHandler;
    }
    async getLeaveRequest(tenantId, id) {
        const query = new get_leave_request_query_1.GetLeaveRequestQuery(tenantId, id);
        const result = await this.getLeaveRequestHandler.execute(query);
        return this.mapper.success(result.data, 'Leave request retrieved');
    }
    async searchLeaveRequests(tenantId, pagination, sort, filters, searchParams) {
        const queryParams = { ...pagination, ...sort, ...filters, ...searchParams };
        const query = new search_leave_requests_query_1.SearchLeaveRequestsQuery(tenantId, queryParams, sort);
        const result = await this.searchLeaveRequestsHandler.execute(query);
        return this.mapper.success(result.data, 'Search successful');
    }
    async getLeaveBalances(tenantId, employeeId) {
        const query = new get_leave_balances_query_1.GetLeaveBalancesQuery(tenantId, employeeId);
        const result = await this.getLeaveBalancesHandler.execute(query);
        return this.mapper.success(result.data, 'Leave balance retrieved');
    }
};
exports.LeaveQueryController = LeaveQueryController;
__decorate([
    (0, common_1.Get)('requests/:id'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get a specific leave request by ID' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the leave request details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Leave request not found' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveQueryController.prototype, "getLeaveRequest", null);
__decorate([
    (0, common_1.Get)('requests'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Search and filter leave requests' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns a paginated list of leave requests' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, common_1.Query)()),
    __param(3, (0, common_1.Query)()),
    __param(4, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, queries_dto_1.PaginationDto,
        queries_dto_1.SortDto,
        queries_dto_1.LeaveFilterDto,
        queries_dto_1.SearchLeaveRequestsDto]),
    __metadata("design:returntype", Promise)
], LeaveQueryController.prototype, "searchLeaveRequests", null);
__decorate([
    (0, common_1.Get)('balances/:employeeId'),
    (0, require_permissions_decorator_1.RequirePermissions)('leave:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get accrued leave balances for an employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Returns the leave balance details' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Employee not found' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('employeeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LeaveQueryController.prototype, "getLeaveBalances", null);
exports.LeaveQueryController = LeaveQueryController = __decorate([
    (0, swagger_1.ApiTags)('Leave Queries'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('leave'),
    __metadata("design:paramtypes", [leave_mapper_1.LeaveMapper,
        get_leave_request_handler_1.GetLeaveRequestHandler,
        search_leave_requests_handler_1.SearchLeaveRequestsHandler,
        get_leave_balances_handler_1.GetLeaveBalancesHandler])
], LeaveQueryController);
//# sourceMappingURL=leave-query.controller.js.map