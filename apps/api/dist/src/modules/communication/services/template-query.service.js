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
exports.TemplateQueryService = void 0;
const common_1 = require("@nestjs/common");
const communication_template_repository_1 = require("../repositories/communication-template.repository");
let TemplateQueryService = class TemplateQueryService {
    constructor(repository) {
        this.repository = repository;
    }
    async getTemplates(query) {
        return this.repository.getTemplates(query.tenantId);
    }
    async resolveTemplate(query) {
        const template = await this.repository.getPublishedTemplateByCode(query.tenantId, query.code);
        if (!template) {
            throw new common_1.NotFoundException(`Template with code ${query.code} not found`);
        }
        if (!template.versions || template.versions.length === 0) {
            throw new Error(`Template ${query.code} has no PUBLISHED versions available for resolution.`);
        }
        return {
            template: {
                id: template.id,
                code: template.code,
                name: template.name,
                channel: template.channel,
            },
            version: template.versions[0],
        };
    }
};
exports.TemplateQueryService = TemplateQueryService;
exports.TemplateQueryService = TemplateQueryService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [communication_template_repository_1.CommunicationTemplateRepository])
], TemplateQueryService);
//# sourceMappingURL=template-query.service.js.map