import { Injectable } from '@nestjs/common';
import { CommunicationTemplateRepository } from '../repositories/communication-template.repository';
import { CreateTemplateCommand } from '../commands/create-template.command';
import { PublishTemplateCommand } from '../commands/publish-template.command';

@Injectable()
export class TemplateCommandService {
  constructor(private readonly repository: CommunicationTemplateRepository) {}

  async createTemplate(command: CreateTemplateCommand) {
    return this.repository.runInTransaction(async (tx) => {
      return this.repository.createTemplate(
        command.tenantId,
        {
          code: command.payload.code,
          name: command.payload.name,
          description: command.payload.description,
          channel: command.payload.channel,
        },
        {
          subject: command.payload.subject,
          body: command.payload.body,
          variables: command.payload.variables,
        },
        tx,
      );
    });
  }

  async publishTemplate(command: PublishTemplateCommand) {
    return this.repository.runInTransaction(async (tx) => {
      // Find and update version to PUBLISHED
      return this.repository.publishVersion(
        command.tenantId,
        command.templateId,
        command.versionId,
        tx,
      );
    });
  }
}
