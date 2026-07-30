"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderTemplateHandler = void 0;
const cqrs_1 = require("@nestjs/cqrs");
const render_template_query_1 = require("../render-template.query");
const template_rendering_service_1 = require("../../services/template-rendering.service");
let RenderTemplateHandler = class RenderTemplateHandler {
    constructor(renderingService) {
        this.renderingService = renderingService;
    }
    async execute(query) {
        return this.renderingService.renderTemplate(query);
    }
};
exports.RenderTemplateHandler = RenderTemplateHandler;
exports.RenderTemplateHandler = RenderTemplateHandler = __decorate([
    (0, cqrs_1.QueryHandler)(render_template_query_1.RenderTemplateQuery),
    __metadata("design:paramtypes", [template_rendering_service_1.TemplateRenderingService])
], RenderTemplateHandler);
//# sourceMappingURL=render-template.handler.js.map