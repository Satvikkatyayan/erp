"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SmtpProvider = void 0;
class SmtpProvider {
    constructor(config) {
        this.config = config;
        Object.freeze(this.config);
    }
    async send(payload) {
        if (!payload || !payload.renderedSubject || !payload.renderedBody) {
            throw new Error('SMTP_VALIDATION_ERROR: Missing required fields in RenderResult');
        }
        try {
            return Promise.resolve();
        }
        catch (error) {
            throw new Error(`SMTP_TRANSPORT_ERROR: ${error.message}`);
        }
    }
}
exports.SmtpProvider = SmtpProvider;
//# sourceMappingURL=smtp.provider.js.map