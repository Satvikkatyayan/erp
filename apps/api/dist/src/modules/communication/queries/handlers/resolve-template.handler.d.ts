import { IQueryHandler } from '@nestjs/cqrs';
import { ResolveTemplateQuery } from '../resolve-template.query';
import { TemplateQueryService } from '../../services/template-query.service';
export declare class ResolveTemplateHandler implements IQueryHandler<ResolveTemplateQuery> {
    private readonly templateQueryService;
    constructor(templateQueryService: TemplateQueryService);
    execute(query: ResolveTemplateQuery): Promise<{
        template: {
            id: any;
            code: any;
            name: any;
            channel: any;
        };
        version: any;
    }>;
}
//# sourceMappingURL=resolve-template.handler.d.ts.map