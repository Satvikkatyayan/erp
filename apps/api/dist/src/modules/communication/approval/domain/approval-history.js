"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApprovalHistory = exports.ApprovalHistoryEvent = void 0;
class ApprovalHistoryEvent {
    constructor(timestamp, state, payload) {
        this.timestamp = timestamp;
        this.state = state;
        this.payload = payload;
        Object.freeze(this);
    }
}
exports.ApprovalHistoryEvent = ApprovalHistoryEvent;
class ApprovalHistory {
    constructor(approvalId) {
        this.approvalId = approvalId;
        this._events = [];
    }
    get events() {
        return Object.freeze([...this._events]);
    }
    append(event) {
        this._events.push(event);
    }
}
exports.ApprovalHistory = ApprovalHistory;
//# sourceMappingURL=approval-history.js.map