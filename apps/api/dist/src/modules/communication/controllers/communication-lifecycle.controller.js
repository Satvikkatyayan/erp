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
exports.CommunicationLifecycleController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const communication_mapper_1 = require("../api/mappers/communication.mapper");
const requests_dto_1 = require("../api/dtos/requests.dto");
const dispatch_communication_command_1 = require("../commands/dispatch-communication.command");
const dispatch_communication_handler_1 = require("../commands/handlers/dispatch-communication.handler");
const channel_enum_1 = require("../domain/channel.enum");
let CommunicationLifecycleController = class CommunicationLifecycleController {
    constructor(mapper, dispatchHandler) {
        this.mapper = mapper;
        this.dispatchHandler = dispatchHandler;
    }
    async dispatchCommunication(tenantId, dto) {
        const command = new dispatch_communication_command_1.DispatchCommunicationCommand(tenantId, dto.recipient || 'unknown-recipient', dto.channel || channel_enum_1.Channel.EMAIL, 'legacy-template', dto.metadata || {});
        const result = await this.dispatchHandler.execute(command);
        return this.mapper.success(result, 'Communication dispatched successfully');
    }
};
exports.CommunicationLifecycleController = CommunicationLifecycleController;
__decorate([
    (0, common_1.Post)('dispatch'),
    (0, require_permissions_decorator_1.RequirePermissions)('communication:dispatch'),
    (0, swagger_1.ApiOperation)({ summary: 'Dispatch a new communication manually' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Communication dispatched successfully' }),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requests_dto_1.DispatchCommunicationRequestDto]),
    __metadata("design:returntype", Promise)
], CommunicationLifecycleController.prototype, "dispatchCommunication", null);
exports.CommunicationLifecycleController = CommunicationLifecycleController = __decorate([
    (0, swagger_1.ApiTags)('Communication Lifecycle'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('communications'),
    __metadata("design:paramtypes", [communication_mapper_1.CommunicationMapper,
        dispatch_communication_handler_1.DispatchCommunicationHandler])
], CommunicationLifecycleController);
//# sourceMappingURL=communication-lifecycle.controller.js.map