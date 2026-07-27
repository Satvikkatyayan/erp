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
exports.RenderSchemaGenerator = void 0;
const common_1 = require("@nestjs/common");
const field_registry_1 = require("../registry/field-registry");
let RenderSchemaGenerator = class RenderSchemaGenerator {
    constructor(fieldRegistry) {
        this.fieldRegistry = fieldRegistry;
    }
    generate(formDefinition, locale) {
        const t = (key) => key.toUpperCase() + '_LOCALIZED';
        return {
            schemaVersion: 'v1.0',
            formCode: formDefinition.code,
            layout: {
                type: formDefinition.layoutType || 'VERTICAL_GRID',
                sections: formDefinition.sections.map(sec => ({
                    code: sec.code,
                    title: t(sec.titleKey),
                    isRepeatable: sec.isRepeatable,
                    fields: sec.fields.map(f => {
                        const baseDef = this.fieldRegistry.get(f.type);
                        return {
                            code: f.code,
                            type: f.type,
                            label: t(f.labelKey),
                            accessibility: baseDef?.accessibility,
                            config: { ...baseDef?.defaultConfig, ...f.config }
                        };
                    })
                }))
            }
        };
    }
};
exports.RenderSchemaGenerator = RenderSchemaGenerator;
exports.RenderSchemaGenerator = RenderSchemaGenerator = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [field_registry_1.FieldRegistry])
], RenderSchemaGenerator);
//# sourceMappingURL=render-schema-generator.js.map