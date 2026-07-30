import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { RenderTemplateQuery } from '../render-template.query';
import { TemplateRenderingService } from '../../services/template-rendering.service';

@QueryHandler(RenderTemplateQuery)
export class RenderTemplateHandler implements IQueryHandler<RenderTemplateQuery> {
  constructor(private readonly renderingService: TemplateRenderingService) {}

  async execute(query: RenderTemplateQuery) {
    return this.renderingService.renderTemplate(query);
  }
}
