import { Module } from '@nestjs/common';
import { HandlebarsCache } from './engine/handlebars.cache';
import { TemplateResolver } from './engine/template.resolver';
import { BuiltInHelpers } from './helpers/built-in.helpers';
import { PuppeteerRenderer } from './renderers/puppeteer.renderer';
import { TemplateLinterService } from './validation/template-linter.service';
import { PlatformTemplateSDK } from './sdk/platform-template.sdk';

@Module({
  providers: [
    HandlebarsCache,
    TemplateResolver,
    BuiltInHelpers,
    PuppeteerRenderer,
    TemplateLinterService,
    PlatformTemplateSDK
  ],
  exports: [PlatformTemplateSDK]
})
export class TemplatesModule {}
