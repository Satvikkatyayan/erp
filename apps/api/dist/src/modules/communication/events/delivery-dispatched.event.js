"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryDispatchedEvent = void 0;
class DeliveryDispatchedEvent {
    constructor(correlationId, tenantId, channel, templateCode) {
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        this.channel = channel;
        this.templateCode = templateCode;
    }
}
exports.DeliveryDispatchedEvent = DeliveryDispatchedEvent;
//# sourceMappingURL=delivery-dispatched.event.js.map