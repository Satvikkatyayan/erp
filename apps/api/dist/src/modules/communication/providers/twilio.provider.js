"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwilioProvider = void 0;
class TwilioProvider {
    constructor(config) {
        this.config = config;
        Object.freeze(this.config);
    }
    async send(payload) {
        if (!payload || !payload.renderedBody) {
            throw new Error('TWILIO_VALIDATION_ERROR: Missing body in RenderResult');
        }
        try {
            return Promise.resolve();
        }
        catch (error) {
            throw new Error(`TWILIO_TRANSPORT_ERROR: ${error.message}`);
        }
    }
}
exports.TwilioProvider = TwilioProvider;
//# sourceMappingURL=twilio.provider.js.map