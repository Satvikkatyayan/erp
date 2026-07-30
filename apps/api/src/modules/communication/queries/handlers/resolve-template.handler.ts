import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ResolveTemplateQuery } from '../resolve-template.query';
import { TemplateQueryService } from '../../services/template-query.service';

@QueryHandler(ResolveTemplateQuery)
export class ResolveTemplateHandler implements IQueryHandler<ResolveTemplateQuery> {
  constructor(private readonly templateQueryService: TemplateQueryService) {}

  async execute(query: ResolveTemplateQuery) {
    return this.templateQueryService.resolveTemplate(query);
  }
}
