"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutingDecisionMadeEvent = void 0;
class RoutingDecisionMadeEvent {
    constructor(correlationId, routingDecisionId, selectedProviderId, tenantId) {
        this.correlationId = correlationId;
        this.routingDecisionId = routingDecisionId;
        this.selectedProviderId = selectedProviderId;
        this.tenantId = tenantId;
        Object.freeze(this);
    }
}
exports.RoutingDecisionMadeEvent = RoutingDecisionMadeEvent;
//# sourceMappingURL=routing-decision-made.event.js.map