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
var PayrollRunController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayrollRunController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const auth_decorators_1 = require("../../../core/decorators/auth.decorators");
const api_response_dto_1 = require("../dtos/shared/api-response.dto");
const payroll_mapper_1 = require("../dtos/mapping/payroll.mapper");
const create_payroll_run_dto_1 = require("../dtos/commands/create-payroll-run.dto");
const start_payroll_collection_dto_1 = require("../dtos/commands/start-payroll-collection.dto");
const generate_payroll_snapshots_dto_1 = require("../dtos/commands/generate-payroll-snapshots.dto");
const calculate_payroll_dto_1 = require("../dtos/commands/calculate-payroll.dto");
const approve_payroll_dto_1 = require("../dtos/commands/approve-payroll.dto");
const lock_payroll_dto_1 = require("../dtos/commands/lock-payroll.dto");
const process_payroll_dto_1 = require("../dtos/commands/process-payroll.dto");
const cancel_payroll_dto_1 = require("../dtos/commands/cancel-payroll.dto");
const reopen_payroll_dto_1 = require("../dtos/commands/reopen-payroll.dto");
const create_payroll_run_command_1 = require("../commands/create-payroll-run.command");
const start_payroll_collection_command_1 = require("../commands/start-payroll-collection.command");
const generate_payroll_snapshots_command_1 = require("../commands/generate-payroll-snapshots.command");
const calculate_payroll_command_1 = require("../commands/calculate-payroll.command");
const approve_payroll_command_1 = require("../commands/approve-payroll.command");
const lock_payroll_command_1 = require("../commands/lock-payroll.command");
const process_payroll_command_1 = require("../commands/process-payroll.command");
const cancel_payroll_command_1 = require("../commands/cancel-payroll.command");
const reopen_payroll_command_1 = require("../commands/reopen-payroll.command");
const create_payroll_run_handler_1 = require("../commands/handlers/create-payroll-run.handler");
const start_payroll_collection_handler_1 = require("../commands/handlers/start-payroll-collection.handler");
const generate_payroll_snapshots_handler_1 = require("../commands/handlers/generate-payroll-snapshots.handler");
const calculate_payroll_handler_1 = require("../commands/handlers/calculate-payroll.handler");
const approve_payroll_handler_1 = require("../commands/handlers/approve-payroll.handler");
const lock_payroll_handler_1 = require("../commands/handlers/lock-payroll.handler");
const process_payroll_handler_1 = require("../commands/handlers/process-payroll.handler");
const cancel_payroll_handler_1 = require("../commands/handlers/cancel-payroll.handler");
const reopen_payroll_handler_1 = require("../commands/handlers/reopen-payroll.handler");
let PayrollRunController = PayrollRunController_1 = class PayrollRunController {
    constructor(createPayrollRunHandler, startPayrollCollectionHandler, generatePayrollSnapshotsHandler, calculatePayrollHandler, approvePayrollHandler, lockPayrollHandler, processPayrollHandler, cancelPayrollHandler, reopenPayrollHandler, mapper) {
        this.createPayrollRunHandler = createPayrollRunHandler;
        this.startPayrollCollectionHandler = startPayrollCollectionHandler;
        this.generatePayrollSnapshotsHandler = generatePayrollSnapshotsHandler;
        this.calculatePayrollHandler = calculatePayrollHandler;
        this.approvePayrollHandler = approvePayrollHandler;
        this.lockPayrollHandler = lockPayrollHandler;
        this.processPayrollHandler = processPayrollHandler;
        this.cancelPayrollHandler = cancelPayrollHandler;
        this.reopenPayrollHandler = reopenPayrollHandler;
        this.mapper = mapper;
        this.logger = new common_1.Logger(PayrollRunController_1.name);
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
    async createRun(dto, ctx) {
        const cmd = this.mapper.toCreatePayrollRunCommand(dto, ctx?.tenantId || 'default');
        this.logger.log(`Payroll Run Created for period ${dto.periodId}`);
        const result = await this.createPayrollRunHandler.execute(new create_payroll_run_command_1.CreatePayrollRunCommand(ctx, cmd.periodId, cmd.runType));
        return this.wrapResponse({ runId: result }, ctx?.correlationId || 'none');
    }
    async collectRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Collection Started for run ${runId}`);
        await this.startPayrollCollectionHandler.execute(new start_payroll_collection_command_1.StartPayrollCollectionCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async generateSnapshots(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Snapshots Generated for run ${runId}`);
        await this.generatePayrollSnapshotsHandler.execute(new generate_payroll_snapshots_command_1.GeneratePayrollSnapshotsCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async calculateRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Calculated for run ${runId}`);
        await this.calculatePayrollHandler.execute(new calculate_payroll_command_1.CalculatePayrollCommand(ctx, runId, dto.currencyId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async approveRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Approved for run ${runId}`);
        await this.approvePayrollHandler.execute(new approve_payroll_command_1.ApprovePayrollCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async lockRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Locked for run ${runId}`);
        await this.lockPayrollHandler.execute(new lock_payroll_command_1.LockPayrollCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async processRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Processed for run ${runId}`);
        await this.processPayrollHandler.execute(new process_payroll_command_1.ProcessPayrollCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async cancelRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Cancelled for run ${runId}`);
        await this.cancelPayrollHandler.execute(new cancel_payroll_command_1.CancelPayrollCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
    async reopenRun(runId, dto, ctx) {
        dto.runId = runId;
        this.logger.log(`Payroll Reopened for run ${runId}`);
        await this.reopenPayrollHandler.execute(new reopen_payroll_command_1.ReopenPayrollCommand(ctx, runId));
        return this.wrapResponse(undefined, ctx?.correlationId || 'none');
    }
};
exports.PayrollRunController = PayrollRunController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new payroll run' }),
    (0, swagger_1.ApiResponse)({ status: 201, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_payroll_run_dto_1.CreatePayrollRunDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "createRun", null);
__decorate([
    (0, common_1.Post)(':runId/collect'),
    (0, swagger_1.ApiOperation)({ summary: 'Start data collection for a payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, start_payroll_collection_dto_1.StartPayrollCollectionDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "collectRun", null);
__decorate([
    (0, common_1.Post)(':runId/generate-snapshots'),
    (0, swagger_1.ApiOperation)({ summary: 'Generate snapshots for a payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, generate_payroll_snapshots_dto_1.GeneratePayrollSnapshotsDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "generateSnapshots", null);
__decorate([
    (0, common_1.Post)(':runId/calculate'),
    (0, swagger_1.ApiOperation)({ summary: 'Calculate payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, calculate_payroll_dto_1.CalculatePayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "calculateRun", null);
__decorate([
    (0, common_1.Post)(':runId/approve'),
    (0, swagger_1.ApiOperation)({ summary: 'Approve payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, approve_payroll_dto_1.ApprovePayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "approveRun", null);
__decorate([
    (0, common_1.Post)(':runId/lock'),
    (0, swagger_1.ApiOperation)({ summary: 'Lock payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, lock_payroll_dto_1.LockPayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "lockRun", null);
__decorate([
    (0, common_1.Post)(':runId/process'),
    (0, swagger_1.ApiOperation)({ summary: 'Process payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, process_payroll_dto_1.ProcessPayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "processRun", null);
__decorate([
    (0, common_1.Post)(':runId/cancel'),
    (0, swagger_1.ApiOperation)({ summary: 'Cancel payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, cancel_payroll_dto_1.CancelPayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "cancelRun", null);
__decorate([
    (0, common_1.Post)(':runId/reopen'),
    (0, swagger_1.ApiOperation)({ summary: 'Reopen payroll run' }),
    (0, swagger_1.ApiParam)({ name: 'runId' }),
    (0, swagger_1.ApiResponse)({ status: 200, type: api_response_dto_1.ApiResponseDto }),
    __param(0, (0, common_1.Param)('runId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, auth_decorators_1.RequestContext)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, reopen_payroll_dto_1.ReopenPayrollDto, Object]),
    __metadata("design:returntype", Promise)
], PayrollRunController.prototype, "reopenRun", null);
exports.PayrollRunController = PayrollRunController = PayrollRunController_1 = __decorate([
    (0, swagger_1.ApiTags)('Payroll Runs'),
    (0, common_1.Controller)('payroll/runs'),
    __metadata("design:paramtypes", [create_payroll_run_handler_1.CreatePayrollRunHandler,
        start_payroll_collection_handler_1.StartPayrollCollectionHandler,
        generate_payroll_snapshots_handler_1.GeneratePayrollSnapshotsHandler,
        calculate_payroll_handler_1.CalculatePayrollHandler,
        approve_payroll_handler_1.ApprovePayrollHandler,
        lock_payroll_handler_1.LockPayrollHandler,
        process_payroll_handler_1.ProcessPayrollHandler,
        cancel_payroll_handler_1.CancelPayrollHandler,
        reopen_payroll_handler_1.ReopenPayrollHandler,
        payroll_mapper_1.PayrollMapper])
], PayrollRunController);
//# sourceMappingURL=payroll-run.controller.js.map