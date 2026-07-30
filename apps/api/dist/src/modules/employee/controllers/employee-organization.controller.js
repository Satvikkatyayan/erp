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
exports.EmployeeOrganizationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const employee_mapper_1 = require("../api/mappers/employee.mapper");
const get_employees_by_manager_query_1 = require("../queries/get-employees-by-manager.query");
const get_employees_by_department_query_1 = require("../queries/get-employees-by-department.query");
const get_employees_by_project_query_1 = require("../queries/get-employees-by-project.query");
const get_employees_by_organization_query_1 = require("../queries/get-employees-by-organization.query");
const get_employees_by_branch_query_1 = require("../queries/get-employees-by-branch.query");
const get_employees_by_manager_handler_1 = require("../queries/handlers/get-employees-by-manager.handler");
const get_employees_by_department_handler_1 = require("../queries/handlers/get-employees-by-department.handler");
const get_employees_by_project_handler_1 = require("../queries/handlers/get-employees-by-project.handler");
const get_employees_by_organization_handler_1 = require("../queries/handlers/get-employees-by-organization.handler");
const get_employees_by_branch_handler_1 = require("../queries/handlers/get-employees-by-branch.handler");
let EmployeeOrganizationController = class EmployeeOrganizationController {
    constructor(mapper, managerHandler, departmentHandler, projectHandler, orgHandler, branchHandler) {
        this.mapper = mapper;
        this.managerHandler = managerHandler;
        this.departmentHandler = departmentHandler;
        this.projectHandler = projectHandler;
        this.orgHandler = orgHandler;
        this.branchHandler = branchHandler;
    }
    async getByManager(tenantId, managerId) {
        const query = new get_employees_by_manager_query_1.GetEmployeesByManagerQuery(tenantId, managerId);
        const result = await this.managerHandler.execute(query);
        return this.mapper.success(result.data, 'Employees retrieved by manager');
    }
    async getByDepartment(tenantId, departmentId) {
        const query = new get_employees_by_department_query_1.GetEmployeesByDepartmentQuery(tenantId, departmentId);
        const result = await this.departmentHandler.execute(query);
        return this.mapper.success(result.data, 'Employees retrieved by department');
    }
    async getByProject(tenantId, projectId) {
        const query = new get_employees_by_project_query_1.GetEmployeesByProjectQuery(tenantId, projectId);
        const result = await this.projectHandler.execute(query);
        return this.mapper.success(result.data, 'Employees retrieved by project');
    }
    async getByOrganization(tenantId, organizationId) {
        const query = new get_employees_by_organization_query_1.GetEmployeesByOrganizationQuery(tenantId, organizationId);
        const result = await this.orgHandler.execute(query);
        return this.mapper.success(result.data, 'Employees retrieved by organization');
    }
    async getByBranch(tenantId, branchId) {
        const query = new get_employees_by_branch_query_1.GetEmployeesByBranchQuery(tenantId, branchId);
        const result = await this.branchHandler.execute(query);
        return this.mapper.success(result.data, 'Employees retrieved by branch');
    }
};
exports.EmployeeOrganizationController = EmployeeOrganizationController;
__decorate([
    (0, common_1.Get)('manager/:managerId'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by manager' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of employees returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('managerId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeOrganizationController.prototype, "getByManager", null);
__decorate([
    (0, common_1.Get)('department/:departmentId'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by department' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of employees returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('departmentId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeOrganizationController.prototype, "getByDepartment", null);
__decorate([
    (0, common_1.Get)('project/:projectId'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by project' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of employees returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('projectId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeOrganizationController.prototype, "getByProject", null);
__decorate([
    (0, common_1.Get)('organization/:organizationId'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by organization' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of employees returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('organizationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeOrganizationController.prototype, "getByOrganization", null);
__decorate([
    (0, common_1.Get)('branch/:branchId'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employees by branch' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of employees returned' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('branchId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeOrganizationController.prototype, "getByBranch", null);
exports.EmployeeOrganizationController = EmployeeOrganizationController = __decorate([
    (0, swagger_1.ApiTags)('Employee Organization'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_mapper_1.EmployeeMapper,
        get_employees_by_manager_handler_1.GetEmployeesByManagerHandler,
        get_employees_by_department_handler_1.GetEmployeesByDepartmentHandler,
        get_employees_by_project_handler_1.GetEmployeesByProjectHandler,
        get_employees_by_organization_handler_1.GetEmployeesByOrganizationHandler,
        get_employees_by_branch_handler_1.GetEmployeesByBranchHandler])
], EmployeeOrganizationController);
//# sourceMappingURL=employee-organization.controller.js.map