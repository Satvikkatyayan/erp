"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryResult = void 0;
class DeliveryResult {
    constructor(isSuccess, finalStage, correlationId, error) {
        this.isSuccess = isSuccess;
        this.finalStage = finalStage;
        this.correlationId = correlationId;
        if (error) {
            this.error = { ...error };
        }
        Object.freeze(this);
        if (this.error)
            Object.freeze(this.error);
    }
}
exports.DeliveryResult = DeliveryResult;
//# sourceMappingURL=delivery-result.js.map