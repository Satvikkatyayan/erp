"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DispatchCommunicationCommand = void 0;
class DispatchCommunicationCommand {
    constructor(tenantId, recipient, channel, templateCode, payload) {
        this.tenantId = tenantId;
        this.recipient = recipient;
        this.channel = channel;
        this.templateCode = templateCode;
        this.payload = payload;
        Object.freeze(this);
        if (this.payload)
            Object.freeze(this.payload);
    }
}
exports.DispatchCommunicationCommand = DispatchCommunicationCommand;
//# sourceMappingURL=dispatch-communication.command.js.map