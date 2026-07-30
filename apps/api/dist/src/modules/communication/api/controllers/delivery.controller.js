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
exports.DeliveryController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const dispatch_communication_dto_1 = require("../dtos/dispatch-communication.dto");
const dispatch_communication_command_1 = require("../../commands/dispatch-communication.command");
let DeliveryController = class DeliveryController {
    constructor(commandBus) {
        this.commandBus = commandBus;
    }
    async dispatch(dto) {
        const command = new dispatch_communication_command_1.DispatchCommunicationCommand(dto.tenantId, dto.recipient, dto.channel, dto.templateCode, dto.payload || {});
        return this.commandBus.execute(command);
    }
};
exports.DeliveryController = DeliveryController;
__decorate([
    (0, common_1.Post)('dispatch'),
    (0, swagger_1.ApiOperation)({ summary: 'Dispatch a communication message to a recipient' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Message dispatched successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dispatch_communication_dto_1.DispatchCommunicationDto]),
    __metadata("design:returntype", Promise)
], DeliveryController.prototype, "dispatch", null);
exports.DeliveryController = DeliveryController = __decorate([
    (0, swagger_1.ApiTags)('Communication Delivery'),
    (0, common_1.Controller)('communication/delivery'),
    __metadata("design:paramtypes", [cqrs_1.CommandBus])
], DeliveryController);
//# sourceMappingURL=delivery.controller.js.map