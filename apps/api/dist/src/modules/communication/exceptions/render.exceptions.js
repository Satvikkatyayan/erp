"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderError = void 0;
class RenderError extends Error {
    constructor(missingVariables) {
        super(`Template rendering failed. Missing required variables: ${missingVariables.join(', ')}`);
        this.name = 'RenderError';
        this.missingVariables = missingVariables;
    }
}
exports.RenderError = RenderError;
//# sourceMappingURL=render.exceptions.js.map