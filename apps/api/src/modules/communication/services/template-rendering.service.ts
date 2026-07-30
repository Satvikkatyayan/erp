import { Injectable } from '@nestjs/common';
import { TemplateQueryService } from './template-query.service';
import { RenderTemplateQuery } from '../queries/render-template.query';
import { ResolveTemplateQuery } from '../queries/resolve-template.query';
import { VariableValidator } from '../domain/variable-validator';
import { TemplateRenderer } from '../domain/template-renderer';
import { RenderError } from '../exceptions/render.exceptions';
import { RenderingWarning } from '../domain/render-warning';

export interface RenderResult {
  renderedSubject: string;
  renderedBody: string;
  templateVersionId: string;
  renderingWarnings: RenderingWarning[];
}

@Injectable()
export class TemplateRenderingService {
  private readonly validator = new VariableValidator();
  private readonly renderer = new TemplateRenderer();

  constructor(private readonly templateQueryService: TemplateQueryService) {}

  async renderTemplate(query: RenderTemplateQuery): Promise<RenderResult> {
    // 1. Resolve template using M2 Query Service
    const resolved = await this.templateQueryService.resolveTemplate(
      new ResolveTemplateQuery(query.tenantId, query.templateCode)
    );

    const version = resolved.version;

    // 2. Validate Payload
    const validationResult = this.validator.validate(version.variables, query.payload);

    // 3. Evaluate ValidationResult (Fail-Fast)
    if (!validationResult.isValid) {
      throw new RenderError(validationResult.validationErrors);
    }

    // 4. Render Template
    const rendered = this.renderer.render(
      version.subject,
      version.body,
      validationResult.validatedPayload
    );

    // 5. Construct RenderResult
    return {
      renderedSubject: rendered.renderedSubject,
      renderedBody: rendered.renderedBody,
      templateVersionId: version.id,
      renderingWarnings: validationResult.renderingWarnings,
    };
  }
}
