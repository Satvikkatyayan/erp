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
var PayrollQueryController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorators_1 = require("../../../core/decorators/auth.decorators");
const api_response_dto_1 = require("../dtos/shared/api-response.dto");
const payroll_mapper_1 = require("../dtos/mapping/payroll.mapper");
const payroll_query_service_1 = require("../services/payroll-query.service");
const payroll_dashboard_query_dto_1 = require("../dtos/queries/payroll-dashboard.query.dto");
const payroll_run_query_dto_1 = require("../dtos/queries/payroll-run.query.dto");
const employee_payroll_query_dto_1 = require("../dtos/queries/employee-payroll.query.dto");
const calculation_breakdown_query_dto_1 = require("../dtos/queries/calculation-breakdown.query.dto");
const payroll_search_query_dto_1 = require("../dtos/queries/payroll-search.query.dto");
const project_payroll_query_dto_1 = require("../dtos/queries/project-payroll.query.dto");
const department_payroll_query_dto_1 = require("../dtos/queries/department-payroll.query.dto");
const designation_payroll_query_dto_1 = require("../dtos/queries/designation-payroll.query.dto");
const branch_payroll_query_dto_1 = require("../dtos/queries/branch-payroll.query.dto");
const cost_center_payroll_query_dto_1 = require("../dtos/queries/cost-center-payroll.query.dto");
let PayrollQueryController = PayrollQueryController_1 = class PayrollQueryController {
    constructor(queryService, mapper) {
        this.queryService = queryService;
        this.mapper = mapper;
        this.logger = new common_1.Logger(PayrollQueryController_1.name);
    }
    wrapResponse(data, requestId) {
        return {
            success: true,
            message: 'Success',
            data,
            timestamp: new Date().toISOString(),
            requestId,
            version: '1'
        };
    }
    async getDashboard(query, ctx) {
        const result = await this.queryService.getDashboardStats(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRuns(query, ctx) {
        const result = await this.queryService.searchAndFilterRuns(ctx?.tenantId || 'default', '', query);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunById(runId, ctx) {
        const result = await this.queryService.getPayrollRunDetails(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(this.mapper.toPayrollRunResponseDto(result), ctx?.correlationId || 'none');
    }
    async getRunTimeline(runId, ctx) {
        const result = await this.queryService.getPayrollTimeline(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunHistory(runId, ctx) {
        const result = await this.queryService.getPayrollEventHistory(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunEvents(runId, ctx) {
        const result = await this.queryService.getPayrollEventHistory(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunCalculations(runId, ctx) {
        const result = await this.queryService.getCalculationHistory(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunSnapshots(runId, ctx) {
        const result = await this.queryService.getPayrollSnapshotHistory(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getRunVersionHistory(runId, ctx) {
        const result = await this.queryService.getVersionHistory(ctx?.tenantId || 'default', runId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async searchPayrolls(query, ctx) {
        const result = await this.queryService.searchAndFilterRuns(ctx?.tenantId || 'default', query.searchTerm || '', query);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getEmployeePayroll(employeeId, query, ctx) {
        const result = await this.queryService.getEmployeePayrollSummary(ctx?.tenantId || 'default', employeeId, 'currentRunId');
        return this.wrapResponse(result ? this.mapper.toEmployeePayrollResponseDto(result) : null, ctx?.correlationId || 'none');
    }
    async getEmployeeHistory(employeeId, ctx) {
        const result = await this.queryService.getEmployeePayrollHistory(ctx?.tenantId || 'default', employeeId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getEmployeePayslips(employeeId, ctx) {
        const result = await this.queryService.getEmployeePayslipHistory(ctx?.tenantId || 'default', employeeId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getEmployeeLatestPayslip(employeeId, ctx) {
        const result = await this.queryService.getLatestPayslip({ tenantId: ctx?.tenantId || 'default', employeeId });
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getCalculationBreakdown(employeeId, query, ctx) {
        const result = await this.queryService.getEmployeeCalculationBreakdown(ctx?.tenantId || 'default', query.calculationId);
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getProjectPayroll(query, ctx) {
        const result = await this.queryService.getProjectPayrollSummary(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getDepartmentPayroll(query, ctx) {
        const result = await this.queryService.getDepartmentPayrollSummary(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getDesignationPayroll(query, ctx) {
        const result = await this.queryService.getDesignationPayrollSummary(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getBranchPayroll(query, ctx) {
        const result = await this.queryService.getBranchPayrollSummary(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
    async getCostCenterPayroll(query, ctx) {
        const result = await this.queryService.getCostCenterPayrollSummary(ctx?.tenantId || 'default');
        return this.wrapResponse(result, ctx?.correlationId || 'none');
    }
};
exports.PayrollQueryController = PayrollQueryController;
__decorate([
    (0, common_1.Get)('dashboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll dashboard data' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_dashboard_query_dto_1.PayrollDashboardQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getDashboard", null);
__decorate([
    (0, common_1.Get)('runs'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll runs' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_run_query_dto_1.PayrollRunQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRuns", null);
__decorate([
    (0, common_1.Get)('runs/:runId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run by ID' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunById", null);
__decorate([
    (0, common_1.Get)('runs/:runId/timeline'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run timeline' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunTimeline", null);
__decorate([
    (0, common_1.Get)('runs/:runId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run history' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunHistory", null);
__decorate([
    (0, common_1.Get)('runs/:runId/events'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run events' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunEvents", null);
__decorate([
    (0, common_1.Get)('runs/:runId/calculations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run calculations' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunCalculations", null);
__decorate([
    (0, common_1.Get)('runs/:runId/snapshots'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run snapshots' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunSnapshots", null);
__decorate([
    (0, common_1.Get)('runs/:runId/version-history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get payroll run version history' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getRunVersionHistory", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiOperation)({ summary: 'Search payrolls' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payroll_search_query_dto_1.PayrollSearchQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "searchPayrolls", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee payroll' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, employee_payroll_query_dto_1.EmployeePayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getEmployeePayroll", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee payroll history' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getEmployeeHistory", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/payslips'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee payslips' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getEmployeePayslips", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/latest-payslip'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee latest payslip' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getEmployeeLatestPayslip", null);
__decorate([
    (0, common_1.Get)('employees/:employeeId/calculation-breakdown'),
    (0, swagger_1.ApiOperation)({ summary: 'Get employee calculation breakdown' }),
    (0, swagger_1.ApiParam)({ name: 'employeeId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('employeeId')),
    __param(1, (0, common_1.Query)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, calculation_breakdown_query_dto_1.CalculationBreakdownQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getCalculationBreakdown", null);
__decorate([
    (0, common_1.Get)('projects'),
    (0, swagger_1.ApiOperation)({ summary: 'Get project payroll' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [project_payroll_query_dto_1.ProjectPayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getProjectPayroll", null);
__decorate([
    (0, common_1.Get)('departments'),
    (0, swagger_1.ApiOperation)({ summary: 'Get department payroll' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [department_payroll_query_dto_1.DepartmentPayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getDepartmentPayroll", null);
__decorate([
    (0, common_1.Get)('designations'),
    (0, swagger_1.ApiOperation)({ summary: 'Get designation payroll' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [designation_payroll_query_dto_1.DesignationPayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getDesignationPayroll", null);
__decorate([
    (0, common_1.Get)('branches'),
    (0, swagger_1.ApiOperation)({ summary: 'Get branch payroll' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [branch_payroll_query_dto_1.BranchPayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getBranchPayroll", null);
__decorate([
    (0, common_1.Get)('cost-centers'),
    (0, swagger_1.ApiOperation)({ summary: 'Get cost center payroll' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cost_center_payroll_query_dto_1.CostCenterPayrollQueryDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollQueryController.prototype, "getCostCenterPayroll", null);
exports.PayrollQueryController = PayrollQueryController = PayrollQueryController_1 = __decorate([
    (0, swagger_1.ApiTags)('Payroll Queries'),
    (0, common_1.Controller)('payroll'),
    __metadata("design:paramtypes", [payroll_query_service_1.PayrollQueryService,
        payroll_mapper_1.PayrollMapper])
], PayrollQueryController);
//# sourceMappingURL=payroll-query.controller.js.map