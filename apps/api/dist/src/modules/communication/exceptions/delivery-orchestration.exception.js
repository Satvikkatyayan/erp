"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryOrchestrationException = void 0;
class DeliveryOrchestrationException extends Error {
    constructor(message) {
        super(`Delivery Orchestration Failed: ${message}`);
        this.name = 'DeliveryOrchestrationException';
    }
}
exports.DeliveryOrchestrationException = DeliveryOrchestrationException;
//# sourceMappingURL=delivery-orchestration.exception.js.map