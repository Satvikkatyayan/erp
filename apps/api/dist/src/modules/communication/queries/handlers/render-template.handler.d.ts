import { IQueryHandler } from '@nestjs/cqrs';
import { RenderTemplateQuery } from '../render-template.query';
import { TemplateRenderingService } from '../../services/template-rendering.service';
export declare class RenderTemplateHandler implements IQueryHandler<RenderTemplateQuery> {
    private readonly renderingService;
    constructor(renderingService: TemplateRenderingService);
    execute(query: RenderTemplateQuery): Promise<import("../../services/template-rendering.service").RenderResult>;
}
//# sourceMappingURL=render-template.handler.d.ts.map