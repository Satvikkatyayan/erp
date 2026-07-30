"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplateMapper = void 0;
const common_1 = require("@nestjs/common");
let TemplateMapper = class TemplateMapper {
    success(data, message = 'Success') {
        return {
            success: true,
            message,
            data,
        };
    }
    mapToTemplateDto(record) {
        if (!record)
            return null;
        return {
            id: record.id,
            code: record.code,
            name: record.name,
            description: record.description,
            channel: record.channel,
            createdAt: record.createdAt,
            versions: record.versions ? record.versions.map((v) => this.mapToVersionDto(v)) : [],
        };
    }
    mapToVersionDto(record) {
        if (!record)
            return null;
        return {
            id: record.id,
            version: record.version,
            status: record.status,
            subject: record.subject,
            body: record.body,
            createdAt: record.createdAt,
            variables: record.variables ? record.variables.map((v) => this.mapToVariableDto(v)) : [],
        };
    }
    mapToVariableDto(record) {
        if (!record)
            return null;
        return {
            id: record.id,
            name: record.name,
            type: record.type,
            required: record.required,
        };
    }
    mapToTemplateDtoList(records) {
        return records.map((record) => this.mapToTemplateDto(record));
    }
};
exports.TemplateMapper = TemplateMapper;
exports.TemplateMapper = TemplateMapper = __decorate([
    (0, common_1.Injectable)()
], TemplateMapper);
//# sourceMappingURL=template.mapper.js.map