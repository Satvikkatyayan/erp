import { HandlebarsCache } from '../engine/handlebars.cache';
import { TemplateResolver } from '../engine/template.resolver';
import { PuppeteerRenderer } from '../renderers/puppeteer.renderer';
import { TemplateLinterService } from '../validation/template-linter.service';
export declare class PlatformTemplateSDK {
    private cache;
    private resolver;
    private pdfRenderer;
    private linter;
    constructor(cache: HandlebarsCache, resolver: TemplateResolver, pdfRenderer: PuppeteerRenderer, linter: TemplateLinterService);
    renderHtml(templateCode: string, payload: any): Promise<string>;
    renderPdf(templateCode: string, payload: any, profileConfig: any): Promise<Buffer>;
    validate(content: string): {
        valid: boolean;
        errors: string[];
    };
}
//# sourceMappingURL=platform-template.sdk.d.ts.map