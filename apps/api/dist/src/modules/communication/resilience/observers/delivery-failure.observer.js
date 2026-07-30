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
exports.DeliveryFailureObserver = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const delivery_failed_event_1 = require("../../events/delivery-failed.event");
const retry_scheduled_event_1 = require("../../events/retry-scheduled.event");
const retry_exhausted_event_1 = require("../../events/retry-exhausted.event");
const retry_scheduler_1 = require("../scheduler/retry.scheduler");
let DeliveryFailureObserver = class DeliveryFailureObserver {
    constructor(classifier, policy, scheduler, eventBus) {
        this.classifier = classifier;
        this.policy = policy;
        this.scheduler = scheduler;
        this.eventBus = eventBus;
        this.attemptsMap = new Map();
    }
    async handle(event) {
        try {
            if (!this.classifier.isTransient(event.errorCode)) {
                return;
            }
            const currentAttempts = (this.attemptsMap.get(event.correlationId) || 0) + 1;
            this.attemptsMap.set(event.correlationId, currentAttempts);
            if (this.policy.canRetry(currentAttempts)) {
                const delayMs = this.policy.computeDelay(currentAttempts);
                this.eventBus.publish(new retry_scheduled_event_1.RetryScheduledEvent(event.correlationId, currentAttempts, delayMs));
                await this.scheduler.scheduleRetry(event.correlationId, event.tenantId, event.channel, delayMs);
            }
            else {
                this.eventBus.publish(new retry_exhausted_event_1.RetryExhaustedEvent(event.correlationId, currentAttempts, event.errorCode));
            }
        }
        catch (error) {
            console.error('Isolated resilience observer failure', error);
        }
    }
};
exports.DeliveryFailureObserver = DeliveryFailureObserver;
exports.DeliveryFailureObserver = DeliveryFailureObserver = __decorate([
    (0, cqrs_1.EventsHandler)(delivery_failed_event_1.DeliveryFailedEvent),
    __param(0, (0, common_1.Inject)('FailureClassifierInterface')),
    __param(1, (0, common_1.Inject)('RetryPolicyInterface')),
    __metadata("design:paramtypes", [Object, Object, retry_scheduler_1.RetryScheduler,
        cqrs_1.EventBus])
], DeliveryFailureObserver);
//# sourceMappingURL=delivery-failure.observer.js.map