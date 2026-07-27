import { Injectable } from '@nestjs/common';
import * as Handlebars from 'handlebars';
import { HandlebarsCache } from '../engine/handlebars.cache';
import { TemplateResolver } from '../engine/template.resolver';
import { PuppeteerRenderer } from '../renderers/puppeteer.renderer';
import { TemplateLinterService } from '../validation/template-linter.service';

@Injectable()
export class PlatformTemplateSDK {
  constructor(
    private cache: HandlebarsCache,
    private resolver: TemplateResolver,
    private pdfRenderer: PuppeteerRenderer,
    private linter: TemplateLinterService
  ) {}

  async renderHtml(templateCode: string, payload: any): Promise<string> {
    const template = this.resolver.resolveVersion(templateCode);
    const partials = this.resolver.resolvePartials(templateCode);
    
    for (const [name, content] of Object.entries(partials)) {
      Handlebars.registerPartial(name, content);
    }
    
    const compiled = this.cache.compile(template.versionId, template.content);
    return compiled(payload);
  }
  
  async renderPdf(templateCode: string, payload: any, profileConfig: any): Promise<Buffer> {
    const html = await this.renderHtml(templateCode, payload);
    return this.pdfRenderer.render(html, profileConfig);
  }

  validate(content: string): { valid: boolean, errors: string[] } {
    return this.linter.validate(content, []);
  }
}