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
exports.DeliveryLifecycleObserver = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const common_1 = require("@nestjs/common");
const delivery_dispatched_event_1 = require("../../events/delivery-dispatched.event");
const delivery_completed_event_1 = require("../../events/delivery-completed.event");
const delivery_failed_event_1 = require("../../events/delivery-failed.event");
let DeliveryLifecycleObserver = class DeliveryLifecycleObserver {
    constructor(telemetry) {
        this.telemetry = telemetry;
        this.dispatchTimes = new Map();
    }
    async handle(event) {
        try {
            if (event instanceof delivery_dispatched_event_1.DeliveryDispatchedEvent) {
                this.dispatchTimes.set(event.correlationId, Date.now());
                this.telemetry.incrementCounter('delivery_dispatched_total', 1, {
                    tenantId: event.tenantId,
                    channel: event.channel
                });
                this.telemetry.logInfo('Delivery dispatched', {
                    correlationId: event.correlationId,
                    tenantId: event.tenantId,
                    channel: event.channel,
                    templateCode: event.templateCode
                });
            }
            else if (event instanceof delivery_completed_event_1.DeliveryCompletedEvent) {
                const duration = this.computeDuration(event.correlationId);
                this.telemetry.incrementCounter('delivery_completed_total', 1, {
                    tenantId: event.tenantId,
                    channel: event.channel,
                    provider: event.providerName
                });
                if (duration !== null) {
                    this.telemetry.recordHistogram('delivery_duration_ms', duration, { channel: event.channel });
                }
                this.telemetry.logInfo('Delivery completed', {
                    correlationId: event.correlationId,
                    provider: event.providerName,
                    durationMs: duration
                });
            }
            else if (event instanceof delivery_failed_event_1.DeliveryFailedEvent) {
                const duration = this.computeDuration(event.correlationId);
                this.telemetry.incrementCounter('delivery_failed_total', 1, {
                    tenantId: event.tenantId,
                    channel: event.channel,
                    stage: event.stage,
                    errorCode: event.errorCode
                });
                this.telemetry.logError(`Delivery failed at ${event.stage}: ${event.errorMessage}`, undefined, {
                    correlationId: event.correlationId,
                    errorCode: event.errorCode,
                    durationMs: duration
                });
            }
        }
        catch (error) {
            console.error('CRITICAL: Observability failure in DeliveryLifecycleObserver', error);
        }
    }
    computeDuration(correlationId) {
        const startTime = this.dispatchTimes.get(correlationId);
        if (startTime) {
            this.dispatchTimes.delete(correlationId);
            return Date.now() - startTime;
        }
        return null;
    }
};
exports.DeliveryLifecycleObserver = DeliveryLifecycleObserver;
exports.DeliveryLifecycleObserver = DeliveryLifecycleObserver = __decorate([
    (0, cqrs_1.EventsHandler)(delivery_dispatched_event_1.DeliveryDispatchedEvent, delivery_completed_event_1.DeliveryCompletedEvent, delivery_failed_event_1.DeliveryFailedEvent),
    __param(0, (0, common_1.Inject)('TelemetryInterface')),
    __metadata("design:paramtypes", [Object])
], DeliveryLifecycleObserver);
//# sourceMappingURL=delivery-lifecycle.observer.js.map