"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryCompletedEvent = void 0;
class DeliveryCompletedEvent {
    constructor(correlationId, tenantId, channel, providerName) {
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        this.channel = channel;
        this.providerName = providerName;
    }
}
exports.DeliveryCompletedEvent = DeliveryCompletedEvent;
//# sourceMappingURL=delivery-completed.event.js.map