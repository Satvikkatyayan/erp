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
exports.CommunicationQueryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const jwt_auth_guard_1 = require("../../../core/authentication/guards/jwt-auth.guard");
const permission_guard_1 = require("../../../core/authorization/guards/permission.guard");
const require_permissions_decorator_1 = require("../../../core/authorization/decorators/require-permissions.decorator");
const communication_mapper_1 = require("../api/mappers/communication.mapper");
const requests_dto_1 = require("../api/dtos/requests.dto");
const get_communication_history_query_1 = require("../queries/get-communication-history.query");
const get_communication_history_handler_1 = require("../queries/handlers/get-communication-history.handler");
let CommunicationQueryController = class CommunicationQueryController {
    constructor(mapper, historyHandler) {
        this.mapper = mapper;
        this.historyHandler = historyHandler;
    }
    async getHistory(tenantId, dto) {
        const query = new get_communication_history_query_1.GetCommunicationHistoryQuery(tenantId, dto);
        const records = await this.historyHandler.execute(query);
        const responseDtos = this.mapper.mapToHistoryDtoList(records);
        return this.mapper.success(responseDtos, 'Communication history retrieved successfully');
    }
};
exports.CommunicationQueryController = CommunicationQueryController;
__decorate([
    (0, common_1.Get)('history'),
    (0, require_permissions_decorator_1.RequirePermissions)('communication:read'),
    (0, swagger_1.ApiOperation)({ summary: 'Get communication history' }),
    (0, swagger_1.ApiHeader)({ name: 'x-tenant-id', required: true }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successfully retrieved communication history' }),
    __param(0, (0, common_1.Headers)('x-tenant-id')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, requests_dto_1.GetCommunicationHistoryQueryDto]),
    __metadata("design:returntype", Promise)
], CommunicationQueryController.prototype, "getHistory", null);
exports.CommunicationQueryController = CommunicationQueryController = __decorate([
    (0, swagger_1.ApiTags)('Communication Query'),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permission_guard_1.PermissionGuard),
    (0, common_1.Controller)('communications'),
    __metadata("design:paramtypes", [communication_mapper_1.CommunicationMapper,
        get_communication_history_handler_1.GetCommunicationHistoryHandler])
], CommunicationQueryController);
//# sourceMappingURL=communication-query.controller.js.map