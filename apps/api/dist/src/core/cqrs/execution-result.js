"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutionResult = void 0;
class ExecutionResult {
    constructor(aggregate, events = [], metadata) {
        this.aggregate = aggregate;
        this.events = events;
        this.metadata = metadata;
    }
}
exports.ExecutionResult = ExecutionResult;
//# sourceMappingURL=execution-result.js.map