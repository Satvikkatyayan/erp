"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingExhaustedEvent = void 0;
class RoutingExhaustedEvent {
    constructor(correlationId, tenantId, channel) {
        this.correlationId = correlationId;
        this.tenantId = tenantId;
        this.channel = channel;
        Object.freeze(this);
    }
}
exports.RoutingExhaustedEvent = RoutingExhaustedEvent;
//# sourceMappingURL=routing-exhausted.event.js.map