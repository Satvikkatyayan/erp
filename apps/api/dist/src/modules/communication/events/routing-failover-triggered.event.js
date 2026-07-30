"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingFailoverTriggeredEvent = void 0;
class RoutingFailoverTriggeredEvent {
    constructor(correlationId, routingDecisionId, previousProviderId, selectedProviderId, tenantId) {
        this.correlationId = correlationId;
        this.routingDecisionId = routingDecisionId;
        this.previousProviderId = previousProviderId;
        this.selectedProviderId = selectedProviderId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.RoutingFailoverTriggeredEvent = RoutingFailoverTriggeredEvent;
//# sourceMappingURL=routing-failover-triggered.event.js.map