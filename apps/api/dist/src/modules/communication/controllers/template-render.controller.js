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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateRenderController = void 0;
const common_1 = require("@nestjs/common");
const cqrs_1 = require("@nestjs/cqrs");
const swagger_1 = require("@nestjs/swagger");
const render_requests_dto_1 = require("../api/dtos/render-requests.dto");
const render_template_query_1 = require("../queries/render-template.query");
const render_mapper_1 = require("../api/mappers/render.mapper");
let TemplateRenderController = class TemplateRenderController {
    constructor(queryBus, renderMapper) {
        this.queryBus = queryBus;
        this.renderMapper = renderMapper;
    }
    async previewTemplate(tenantId, templateCode, payload) {
        const query = new render_template_query_1.RenderTemplateQuery(tenantId, templateCode, payload.payload || {});
        const result = await this.queryBus.execute(query);
        return this.renderMapper.success(this.renderMapper.mapToResponseDto(result), 'Template preview rendered successfully');
    }
};
exports.TemplateRenderController = TemplateRenderController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Preview a rendered template' }),
    __param(0, (0, common_1.Param)('tenantId')),
    __param(1, (0, common_1.Param)('templateCode')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, render_requests_dto_1.RenderTemplateRequestDto]),
    __metadata("design:returntype", Promise)
], TemplateRenderController.prototype, "previewTemplate", null);
exports.TemplateRenderController = TemplateRenderController = __decorate([
    (0, swagger_1.ApiTags)('Communication Rendering Preview'),
    (0, common_1.Controller)('communication/templates/:tenantId/:templateCode/preview'),
    __metadata("design:paramtypes", [cqrs_1.QueryBus,
        render_mapper_1.RenderMapper])
], TemplateRenderController);
//# sourceMappingURL=template-render.controller.js.map