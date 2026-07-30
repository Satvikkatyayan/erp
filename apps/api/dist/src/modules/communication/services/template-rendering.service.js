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
exports.TemplateRenderingService = void 0;
const common_1 = require("@nestjs/common");
const template_query_service_1 = require("./template-query.service");
const resolve_template_query_1 = require("../queries/resolve-template.query");
const variable_validator_1 = require("../domain/variable-validator");
const template_renderer_1 = require("../domain/template-renderer");
const render_exceptions_1 = require("../exceptions/render.exceptions");
let TemplateRenderingService = class TemplateRenderingService {
    constructor(templateQueryService) {
        this.templateQueryService = templateQueryService;
        this.validator = new variable_validator_1.VariableValidator();
        this.renderer = new template_renderer_1.TemplateRenderer();
    }
    async renderTemplate(query) {
        const resolved = await this.templateQueryService.resolveTemplate(new resolve_template_query_1.ResolveTemplateQuery(query.tenantId, query.templateCode));
        const version = resolved.version;
        const validationResult = this.validator.validate(version.variables, query.payload);
        if (!validationResult.isValid) {
            throw new render_exceptions_1.RenderError(validationResult.validationErrors);
        }
        const rendered = this.renderer.render(version.subject, version.body, validationResult.validatedPayload);
        return {
            renderedSubject: rendered.renderedSubject,
            renderedBody: rendered.renderedBody,
            templateVersionId: version.id,
            renderingWarnings: validationResult.renderingWarnings,
        };
    }
};
exports.TemplateRenderingService = TemplateRenderingService;
exports.TemplateRenderingService = TemplateRenderingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [template_query_service_1.TemplateQueryService])
], TemplateRenderingService);
//# sourceMappingURL=template-rendering.service.js.map