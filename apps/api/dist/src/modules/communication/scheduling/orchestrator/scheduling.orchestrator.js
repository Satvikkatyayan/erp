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
exports.SchedulingOrchestrator = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const delivery_result_1 = require("../../domain/delivery-result");
const delivery_lifecycle_enum_1 = require("../../domain/delivery-lifecycle.enum");
const schedule_created_event_1 = require("../../events/schedule-created.event");
const crypto_1 = require("crypto");
let SchedulingOrchestrator = class SchedulingOrchestrator {
    constructor(eligibilityService, policyService, deliveryService, eventBus) {
        this.eligibilityService = eligibilityService;
        this.policyService = policyService;
        this.deliveryService = deliveryService;
        this.eventBus = eventBus;
    }
    async processCommand(command) {
        const isEligible = this.eligibilityService.isEligibleForScheduling(command);
        if (!isEligible) {
            return this.deliveryService.executeDelivery(command);
        }
        const releaseTime = this.policyService.determineReleaseTime(command);
        const scheduleId = (0, crypto_1.randomUUID)();
        const correlationId = (0, crypto_1.randomUUID)();
        this.eventBus.publish(new schedule_created_event_1.ScheduleCreatedEvent(correlationId, scheduleId, command.tenantId, releaseTime));
        return new delivery_result_1.DeliveryResult(true, delivery_lifecycle_enum_1.DeliveryLifecycle.RECEIVED, correlationId, {
            code: 'SCHEDULED',
            message: `Communication scheduled for ${releaseTime.toISOString()}`
        });
    }
};
exports.SchedulingOrchestrator = SchedulingOrchestrator;
exports.SchedulingOrchestrator = SchedulingOrchestrator = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('SchedulingEligibilityInterface')),
    __param(1, (0, common_1.Inject)('SchedulingPolicyInterface')),
    __param(2, (0, common_1.Inject)('DeliveryServiceInterface')),
    __metadata("design:paramtypes", [Object, Object, Object, cqrs_1.EventBus])
], SchedulingOrchestrator);
//# sourceMappingURL=scheduling.orchestrator.js.map