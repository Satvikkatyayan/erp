"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryFailedEvent = void 0;
class DeliveryFailedEvent {
    constructor(correlationId, tenantId, channel, stage, errorCode, errorMessage) {
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        this.channel = channel;
        this.stage = stage;
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
exports.DeliveryFailedEvent = DeliveryFailedEvent;
//# sourceMappingURL=delivery-failed.event.js.map