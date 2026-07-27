"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DefaultTemplateEngine_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultTemplateEngine = void 0;
const common_1 = require("@nestjs/common");
let DefaultTemplateEngine = DefaultTemplateEngine_1 = class DefaultTemplateEngine {
    constructor() {
        this.logger = new common_1.Logger(DefaultTemplateEngine_1.name);
    }
    transform(payload, mappingAst) {
        this.logger.debug('Executing declarative Mapping DSL...');
        const result = {};
        for (const key of Object.keys(mappingAst)) {
            const rule = mappingAst[key];
            if (rule.sourceField) {
                result[key] = payload[rule.sourceField] ?? rule.defaultValue;
            }
            else if (rule.interpolate) {
                let str = rule.interpolate;
                for (const pKey of Object.keys(payload)) {
                    str = str.replace(`{{${pKey}}}`, payload[pKey]);
                }
                result[key] = str;
            }
            else if (rule.condition) {
                if (payload[rule.condition.field] === rule.condition.equals) {
                    result[key] = rule.condition.then;
                }
                else {
                    result[key] = rule.condition.else;
                }
            }
        }
        return result;
    }
};
exports.DefaultTemplateEngine = DefaultTemplateEngine;
exports.DefaultTemplateEngine = DefaultTemplateEngine = DefaultTemplateEngine_1 = __decorate([
    (0, common_1.Injectable)()
], DefaultTemplateEngine);
//# sourceMappingURL=transformation.engine.js.map