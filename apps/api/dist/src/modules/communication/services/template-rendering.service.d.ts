import { TemplateQueryService } from './template-query.service';
import { RenderTemplateQuery } from '../queries/render-template.query';
import { RenderingWarning } from '../domain/render-warning';
export interface RenderResult {
    renderedSubject: string;
    renderedBody: string;
    templateVersionId: string;
    renderingWarnings: RenderingWarning[];
}
export declare class TemplateRenderingService {
    private readonly templateQueryService;
    private readonly validator;
    private readonly renderer;
    constructor(templateQueryService: TemplateQueryService);
    renderTemplate(query: RenderTemplateQuery): Promise<RenderResult>;
}
//# sourceMappingURL=template-rendering.service.d.ts.map