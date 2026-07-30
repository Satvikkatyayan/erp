import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { GetTemplatesQuery } from '../get-templates.query';
import { TemplateQueryService } from '../../services/template-query.service';

@QueryHandler(GetTemplatesQuery)
export class GetTemplatesHandler implements IQueryHandler<GetTemplatesQuery> {
  constructor(private readonly templateQueryService: TemplateQueryService) {}

  async execute(query: GetTemplatesQuery) {
    return this.templateQueryService.getTemplates(query);
  }
}
