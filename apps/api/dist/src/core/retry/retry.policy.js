"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetryPolicy = void 0;
const retry_decision_1 = require("./retry.decision");
class RetryPolicy {
    constructor(maxRetries, baseDelayMs, strategy) {
        this.maxRetries = maxRetries;
        this.baseDelayMs = baseDelayMs;
        this.strategy = strategy;
    }
    shouldRetry(retryCount, error) {
        if (this.strategy === 'NEVER')
            return false;
        return retryCount < this.maxRetries;
    }
    getDelayMs(retryCount) {
        switch (this.strategy) {
            case 'IMMEDIATE':
            case 'NEVER':
                return 0;
            case 'FIXED':
                return this.baseDelayMs;
            case 'EXPONENTIAL':
                return this.baseDelayMs * Math.pow(2, retryCount);
            default:
                return this.baseDelayMs;
        }
    }
    evaluate(retryCount, error) {
        return new retry_decision_1.RetryDecision(this.shouldRetry(retryCount, error), this.getDelayMs(retryCount));
    }
}
exports.RetryPolicy = RetryPolicy;
//# sourceMappingURL=retry.policy.js.map