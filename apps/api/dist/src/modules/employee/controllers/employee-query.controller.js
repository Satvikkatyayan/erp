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
exports.EmployeeQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const employee_mapper_1 = require("../api/mappers/employee.mapper");
const queries_dto_1 = require("../api/dtos/queries.dto");
const get_employee_profile_query_1 = require("../queries/get-employee-profile.query");
const get_employee_summary_query_1 = require("../queries/get-employee-summary.query");
const get_employee_timeline_query_1 = require("../queries/get-employee-timeline.query");
const search_employees_query_1 = require("../queries/search-employees.query");
const get_employment_status_query_1 = require("../queries/get-employment-status.query");
const get_exit_information_query_1 = require("../queries/get-exit-information.query");
const get_employee_profile_handler_1 = require("../queries/handlers/get-employee-profile.handler");
const get_employee_summary_handler_1 = require("../queries/handlers/get-employee-summary.handler");
const get_employee_timeline_handler_1 = require("../queries/handlers/get-employee-timeline.handler");
const search_employees_handler_1 = require("../queries/handlers/search-employees.handler");
const get_employment_status_handler_1 = require("../queries/handlers/get-employment-status.handler");
const get_exit_information_handler_1 = require("../queries/handlers/get-exit-information.handler");
let EmployeeQueryController = class EmployeeQueryController {
    constructor(mapper, profileHandler, summaryHandler, timelineHandler, searchHandler, employmentStatusHandler, exitInfoHandler) {
        this.mapper = mapper;
        this.profileHandler = profileHandler;
        this.summaryHandler = summaryHandler;
        this.timelineHandler = timelineHandler;
        this.searchHandler = searchHandler;
        this.employmentStatusHandler = employmentStatusHandler;
        this.exitInfoHandler = exitInfoHandler;
    }
    async searchEmployees(tenantId, queryDto) {
        const filters = queryDto.filters ? JSON.parse(queryDto.filters) : {};
        const sort = queryDto.sort ? JSON.parse(queryDto.sort) : undefined;
        const query = new search_employees_query_1.SearchEmployeesQuery(tenantId, filters, sort);
        const result = await this.searchHandler.execute(query);
        return this.mapper.success(result.data, 'Search successful');
    }
    async getEmployeeProfile(tenantId, employeeId) {
        const query = new get_employee_profile_query_1.GetEmployeeProfileQuery(tenantId, employeeId);
        const result = await this.profileHandler.execute(query);
        return this.mapper.success(result.data, 'Profile retrieved');
    }
    async getEmployeeSummary(tenantId, employeeId) {
        const query = new get_employee_summary_query_1.GetEmployeeSummaryQuery(tenantId, employeeId);
        const result = await this.summaryHandler.execute(query);
        return this.mapper.success(result.data, 'Summary retrieved');
    }
    async getEmployeeTimeline(tenantId, employeeId) {
        const query = new get_employee_timeline_query_1.GetEmployeeTimelineQuery(tenantId, employeeId);
        const result = await this.timelineHandler.execute(query);
        return this.mapper.success(result.data, 'Timeline retrieved');
    }
    async getEmploymentStatus(tenantId, employeeId) {
        const query = new get_employment_status_query_1.GetEmploymentStatusQuery(tenantId, employeeId);
        const result = await this.employmentStatusHandler.execute(query);
        return this.mapper.success(result.data, 'Employment status retrieved');
    }
    async getExitInformation(tenantId, employeeId) {
        const query = new get_exit_information_query_1.GetExitInformationQuery(tenantId, employeeId);
        const result = await this.exitInfoHandler.execute(query);
        return this.mapper.success(result.data, 'Exit information retrieved');
    }
};
exports.EmployeeQueryController = EmployeeQueryController;
__decorate([
    (0, common_1.Get)('search'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Search employees' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Search results returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, queries_dto_1.SearchEmployeesDto]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "searchEmployees", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee profile' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Profile returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "getEmployeeProfile", null);
__decorate([
    (0, common_1.Get)(':id/summary'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee summary' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Summary returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "getEmployeeSummary", null);
__decorate([
    (0, common_1.Get)(':id/timeline'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee timeline' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Timeline returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "getEmployeeTimeline", null);
__decorate([
    (0, common_1.Get)(':id/employment'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employment status' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employment status returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "getEmploymentStatus", null);
__decorate([
    (0, common_1.Get)(':id/exit'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get exit information' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Exit info returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeQueryController.prototype, "getExitInformation", null);
exports.EmployeeQueryController = EmployeeQueryController = __decorate([
    (0, swagger_1.ApiTags)('Employee Queries'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_mapper_1.EmployeeMapper,
        get_employee_profile_handler_1.GetEmployeeProfileHandler,
        get_employee_summary_handler_1.GetEmployeeSummaryHandler,
        get_employee_timeline_handler_1.GetEmployeeTimelineHandler,
        search_employees_handler_1.SearchEmployeesHandler,
        get_employment_status_handler_1.GetEmploymentStatusHandler,
        get_exit_information_handler_1.GetExitInformationHandler])
], EmployeeQueryController);
//# sourceMappingURL=employee-query.controller.js.map