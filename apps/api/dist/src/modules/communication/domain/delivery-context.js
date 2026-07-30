"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryContext = void 0;
class DeliveryContext {
    constructor(tenantId, recipient, channel, templateCode, payload, correlationId) {
        this.tenantId = tenantId;
        this.recipient = recipient;
        this.channel = channel;
        this.templateCode = templateCode;
        this.payload = { ...payload };
        this.correlationId = correlationId;
        Object.freeze(this);
        Object.freeze(this.payload);
    }
}
exports.DeliveryContext = DeliveryContext;
//# sourceMappingURL=delivery-context.js.map