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
exports.EmployeeLifecycleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const employee_mapper_1 = require("../api/mappers/employee.mapper");
const requests_dto_1 = require("../api/dtos/requests.dto");
const onboard_employee_command_1 = require("../commands/onboard-employee.command");
const join_employee_command_1 = require("../commands/join-employee.command");
const begin_probation_command_1 = require("../commands/begin-probation.command");
const confirm_employee_command_1 = require("../commands/confirm-employee.command");
const transfer_employee_command_1 = require("../commands/transfer-employee.command");
const promote_employee_command_1 = require("../commands/promote-employee.command");
const resign_employee_command_1 = require("../commands/resign-employee.command");
const terminate_employee_command_1 = require("../commands/terminate-employee.command");
const exit_employee_command_1 = require("../commands/exit-employee.command");
const rehire_employee_command_1 = require("../commands/rehire-employee.command");
const onboard_employee_handler_1 = require("../commands/handlers/onboard-employee.handler");
const join_employee_handler_1 = require("../commands/handlers/join-employee.handler");
const begin_probation_handler_1 = require("../commands/handlers/begin-probation.handler");
const confirm_employee_handler_1 = require("../commands/handlers/confirm-employee.handler");
const transfer_employee_handler_1 = require("../commands/handlers/transfer-employee.handler");
const promote_employee_handler_1 = require("../commands/handlers/promote-employee.handler");
const resign_employee_handler_1 = require("../commands/handlers/resign-employee.handler");
const terminate_employee_handler_1 = require("../commands/handlers/terminate-employee.handler");
const exit_employee_handler_1 = require("../commands/handlers/exit-employee.handler");
const rehire_employee_handler_1 = require("../commands/handlers/rehire-employee.handler");
let EmployeeLifecycleController = class EmployeeLifecycleController {
    constructor(mapper, onboardHandler, joinHandler, probationHandler, confirmHandler, transferHandler, promoteHandler, resignHandler, terminateHandler, exitHandler, rehireHandler) {
        this.mapper = mapper;
        this.onboardHandler = onboardHandler;
        this.joinHandler = joinHandler;
        this.probationHandler = probationHandler;
        this.confirmHandler = confirmHandler;
        this.transferHandler = transferHandler;
        this.promoteHandler = promoteHandler;
        this.resignHandler = resignHandler;
        this.terminateHandler = terminateHandler;
        this.exitHandler = exitHandler;
        this.rehireHandler = rehireHandler;
    }
    async onboardEmployee(tenantId, dto) {
        const command = new onboard_employee_command_1.OnboardEmployeeCommand(tenantId, dto.data);
        await this.onboardHandler.execute(command);
        return this.mapper.success(null, 'Employee onboarded successfully');
    }
    async joinEmployee(tenantId, employeeId, dto) {
        const command = new join_employee_command_1.JoinEmployeeCommand(tenantId, employeeId);
        await this.joinHandler.execute(command);
        return this.mapper.success(null, 'Employee joined successfully');
    }
    async beginProbation(tenantId, employeeId) {
        const command = new begin_probation_command_1.BeginProbationCommand(tenantId, employeeId);
        await this.probationHandler.execute(command);
        return this.mapper.success(null, 'Probation started successfully');
    }
    async confirmEmployee(tenantId, employeeId, dto) {
        const command = new confirm_employee_command_1.ConfirmEmployeeCommand(tenantId, employeeId, dto.confirmedBy, new Date(dto.confirmedAt));
        await this.confirmHandler.execute(command);
        return this.mapper.success(null, 'Employee confirmed successfully');
    }
    async transferEmployee(tenantId, employeeId, dto) {
        const command = new transfer_employee_command_1.TransferEmployeeCommand(tenantId, employeeId, dto.newAssignmentData);
        await this.transferHandler.execute(command);
        return this.mapper.success(null, 'Employee transferred successfully');
    }
    async promoteEmployee(tenantId, employeeId, dto) {
        const command = new promote_employee_command_1.PromoteEmployeeCommand(tenantId, employeeId, dto.newAssignmentData);
        await this.promoteHandler.execute(command);
        return this.mapper.success(null, 'Employee promoted successfully');
    }
    async resignEmployee(tenantId, employeeId, dto) {
        const command = new resign_employee_command_1.ResignEmployeeCommand(tenantId, employeeId, dto.resignationDate);
        await this.resignHandler.execute(command);
        return this.mapper.success(null, 'Employee resigned successfully');
    }
    async terminateEmployee(tenantId, employeeId, dto) {
        const command = new terminate_employee_command_1.TerminateEmployeeCommand(tenantId, employeeId, dto.terminationDate);
        await this.terminateHandler.execute(command);
        return this.mapper.success(null, 'Employee terminated successfully');
    }
    async exitEmployee(tenantId, employeeId, dto) {
        const command = new exit_employee_command_1.ExitEmployeeCommand(tenantId, employeeId, dto.exitDate);
        await this.exitHandler.execute(command);
        return this.mapper.success(null, 'Employee exit processed successfully');
    }
    async rehireEmployee(tenantId, employeeId, dto) {
        const command = new rehire_employee_command_1.RehireEmployeeCommand(tenantId, employeeId, dto.initialAssignmentData);
        await this.rehireHandler.execute(command);
        return this.mapper.success(null, 'Employee rehired successfully');
    }
};
exports.EmployeeLifecycleController = EmployeeLifecycleController;
__decorate([
    (0, common_1.Post)('onboard'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:onboard'),
    (0, swagger_1.ApiOperation)({ summary: 'Onboard a new employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Employee onboarded successfully' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requests_dto_1.OnboardEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "onboardEmployee", null);
__decorate([
    (0, common_1.Post)(':id/join'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:join'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark employee as joined' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee joined successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.JoinEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "joinEmployee", null);
__decorate([
    (0, common_1.Post)(':id/probation'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:probation'),
    (0, swagger_1.ApiOperation)({ summary: 'Begin employee probation' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Probation started successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "beginProbation", null);
__decorate([
    (0, common_1.Post)(':id/confirm'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:confirm'),
    (0, swagger_1.ApiOperation)({ summary: 'Confirm employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee confirmed successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.ConfirmEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "confirmEmployee", null);
__decorate([
    (0, common_1.Post)(':id/transfer'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee transferred successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.TransferEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "transferEmployee", null);
__decorate([
    (0, common_1.Post)(':id/promote'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:promote'),
    (0, swagger_1.ApiOperation)({ summary: 'Promote employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee promoted successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.PromoteEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "promoteEmployee", null);
__decorate([
    (0, common_1.Post)(':id/resign'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:resign'),
    (0, swagger_1.ApiOperation)({ summary: 'Mark employee as resigned' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee resigned successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.ResignEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "resignEmployee", null);
__decorate([
    (0, common_1.Post)(':id/terminate'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:terminate'),
    (0, swagger_1.ApiOperation)({ summary: 'Terminate employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee terminated successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.TerminateEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "terminateEmployee", null);
__decorate([
    (0, common_1.Post)(':id/exit'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:exit'),
    (0, swagger_1.ApiOperation)({ summary: 'Process employee exit' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee exit processed successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.ExitEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "exitEmployee", null);
__decorate([
    (0, common_1.Post)(':id/rehire'),
    (0, require_permissions_decorator_1.RequirePermissions)('employee:rehire'),
    (0, swagger_1.ApiOperation)({ summary: 'Rehire an exited employee' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Employee rehired successfully' }),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, requests_dto_1.RehireEmployeeRequestDto]),
    __metadata("design:returntype", Promise)
], EmployeeLifecycleController.prototype, "rehireEmployee", null);
exports.EmployeeLifecycleController = EmployeeLifecycleController = __decorate([
    (0, swagger_1.ApiTags)('Employee Lifecycle'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('employees'),
    __metadata("design:paramtypes", [employee_mapper_1.EmployeeMapper,
        onboard_employee_handler_1.OnboardEmployeeHandler,
        join_employee_handler_1.JoinEmployeeHandler,
        begin_probation_handler_1.BeginProbationHandler,
        confirm_employee_handler_1.ConfirmEmployeeHandler,
        transfer_employee_handler_1.TransferEmployeeHandler,
        promote_employee_handler_1.PromoteEmployeeHandler,
        resign_employee_handler_1.ResignEmployeeHandler,
        terminate_employee_handler_1.TerminateEmployeeHandler,
        exit_employee_handler_1.ExitEmployeeHandler,
        rehire_employee_handler_1.RehireEmployeeHandler])
], EmployeeLifecycleController);
//# sourceMappingURL=employee-lifecycle.controller.js.map