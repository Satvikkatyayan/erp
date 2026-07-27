"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TemplatesModule = void 0;
const common_1 = require("@nestjs/common");
const handlebars_cache_1 = require("./engine/handlebars.cache");
const template_resolver_1 = require("./engine/template.resolver");
const built_in_helpers_1 = require("./helpers/built-in.helpers");
const puppeteer_renderer_1 = require("./renderers/puppeteer.renderer");
const template_linter_service_1 = require("./validation/template-linter.service");
const platform_template_sdk_1 = require("./sdk/platform-template.sdk");
let TemplatesModule = class TemplatesModule {
};
exports.TemplatesModule = TemplatesModule;
exports.TemplatesModule = TemplatesModule = __decorate([
    (0, common_1.Module)({
        providers: [
            handlebars_cache_1.HandlebarsCache,
            template_resolver_1.TemplateResolver,
            built_in_helpers_1.BuiltInHelpers,
            puppeteer_renderer_1.PuppeteerRenderer,
            template_linter_service_1.TemplateLinterService,
            platform_template_sdk_1.PlatformTemplateSDK
        ],
        exports: [platform_template_sdk_1.PlatformTemplateSDK]
    })
], TemplatesModule);
//# sourceMappingURL=templates.module.js.map