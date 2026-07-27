"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRenderer = void 0;
const common_1 = require("@nestjs/common");
let TemplateRenderer = class TemplateRenderer {
    render(templateString, variables) {
        return templateString.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
            const keys = key.split('.');
            let val = variables;
            for (const k of keys) {
                val = val?.[k];
            }
            return val || match;
        });
    }
};
exports.TemplateRenderer = TemplateRenderer;
exports.TemplateRenderer = TemplateRenderer = __decorate([
    (0, common_1.Injectable)()
], TemplateRenderer);
//# sourceMappingURL=template.renderer.js.map