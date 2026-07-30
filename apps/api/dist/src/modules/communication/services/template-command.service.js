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
exports.TemplateCommandService = void 0;
const common_1 = require("@nestjs/common");
const communication_template_repository_1 = require("../repositories/communication-template.repository");
let TemplateCommandService = class TemplateCommandService {
    constructor(repository) {
        this.repository = repository;
    }
    async createTemplate(command) {
        return this.repository.runInTransaction(async (tx) => {
            return this.repository.createTemplate(command.tenantId, {
                code: command.payload.code,
                name: command.payload.name,
                description: command.payload.description,
                channel: command.payload.channel,
            }, {
                subject: command.payload.subject,
                body: command.payload.body,
                variables: command.payload.variables,
            }, tx);
        });
    }
    async publishTemplate(command) {
        return this.repository.runInTransaction(async (tx) => {
            return this.repository.publishVersion(command.tenantId, command.templateId, command.versionId, tx);
        });
    }
};
exports.TemplateCommandService = TemplateCommandService;
exports.TemplateCommandService = TemplateCommandService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [communication_template_repository_1.CommunicationTemplateRepository])
], TemplateCommandService);
//# sourceMappingURL=template-command.service.js.map