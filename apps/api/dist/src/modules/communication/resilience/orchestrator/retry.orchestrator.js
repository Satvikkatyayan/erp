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
var RetryOrchestrator_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const delivery_service_1 = require("../../services/delivery.service");
const dispatch_communication_command_1 = require("../../commands/dispatch-communication.command");
let RetryOrchestrator = RetryOrchestrator_1 = class RetryOrchestrator {
    constructor(deliveryService) {
        this.deliveryService = deliveryService;
        this.logger = new common_1.Logger(RetryOrchestrator_1.name);
    }
    async executeRetry(correlationId, tenantId, channel, attemptId) {
        this.logger.log(`Executing retry for correlationId: ${correlationId}, attemptId: ${attemptId}`);
        const command = new dispatch_communication_command_1.DispatchCommunicationCommand(tenantId, 'unknown-recipient', channel, 'unknown-template', { _isRetry: true, _attemptId: attemptId });
        await this.deliveryService.executeDelivery(command);
    }
};
exports.RetryOrchestrator = RetryOrchestrator;
exports.RetryOrchestrator = RetryOrchestrator = RetryOrchestrator_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [delivery_service_1.DeliveryService])
], RetryOrchestrator);
//# sourceMappingURL=retry.orchestrator.js.map