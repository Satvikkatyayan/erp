import { Injectable, NotFoundException } from '@nestjs/common';
import { CommunicationTemplateRepository } from '../repositories/communication-template.repository';
import { ResolveTemplateQuery } from '../queries/resolve-template.query';
import { GetTemplatesQuery } from '../queries/get-templates.query';

@Injectable()
export class TemplateQueryService {
  constructor(private readonly repository: CommunicationTemplateRepository) {}

  async getTemplates(query: GetTemplatesQuery) {
    return this.repository.getTemplates(query.tenantId);
  }

  async resolveTemplate(query: ResolveTemplateQuery) {
    const template = await this.repository.getPublishedTemplateByCode(query.tenantId, query.code);

    if (!template) {
      throw new NotFoundException(`Template with code ${query.code} not found`);
    }

    if (!template.versions || template.versions.length === 0) {
      // Enforce the rule: "Template Resolution never returns Draft or Archived versions. If no Published version exists, fail deterministically."
      throw new Error(`Template ${query.code} has no PUBLISHED versions available for resolution.`);
    }

    // Return the first published version found
    // If we have strict rules about only 1 published version at a time, template.versions[0] is the correct one.
    return {
      template: {
        id: template.id,
        code: template.code,
        name: template.name,
        channel: template.channel,
      },
      version: template.versions[0],
    };
  }
}
