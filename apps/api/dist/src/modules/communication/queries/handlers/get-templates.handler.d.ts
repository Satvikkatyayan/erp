import { IQueryHandler } from '@nestjs/cqrs';
import { GetTemplatesQuery } from '../get-templates.query';
import { TemplateQueryService } from '../../services/template-query.service';
export declare class GetTemplatesHandler implements IQueryHandler<GetTemplatesQuery> {
    private readonly templateQueryService;
    constructor(templateQueryService: TemplateQueryService);
    execute(query: GetTemplatesQuery): Promise<any>;
}
//# sourceMappingURL=get-templates.handler.d.ts.map