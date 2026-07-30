"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRenderer = void 0;
class TemplateRenderer {
    render(subject, body, payload) {
        const renderedSubject = this.interpolate(subject, payload);
        const renderedBody = this.interpolate(body, payload);
        return {
            renderedSubject,
            renderedBody,
        };
    }
    interpolate(template, payload) {
        if (!template)
            return '';
        return template.replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (match, variableName) => {
            const value = payload[variableName];
            return value !== undefined && value !== null ? String(value) : match;
        });
    }
}
exports.TemplateRenderer = TemplateRenderer;
//# sourceMappingURL=template-renderer.js.map