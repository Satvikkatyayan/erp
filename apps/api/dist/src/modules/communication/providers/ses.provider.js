"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesProvider = void 0;
class SesProvider {
    constructor(config) {
        this.config = config;
        Object.freeze(this.config);
    }
    async send(payload) {
        if (!payload || !payload.renderedSubject || !payload.renderedBody) {
            throw new Error('SES_VALIDATION_ERROR: Missing required fields in RenderResult');
        }
        try {
            return Promise.resolve();
        }
        catch (error) {
            throw new Error(`SES_TRANSPORT_ERROR: ${error.message}`);
        }
    }
}
exports.SesProvider = SesProvider;
//# sourceMappingURL=ses.provider.js.map