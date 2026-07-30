import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PublishTemplateCommand } from '../publish-template.command';
import { TemplateCommandService } from '../../services/template-command.service';

@CommandHandler(PublishTemplateCommand)
export class PublishTemplateHandler implements ICommandHandler<PublishTemplateCommand> {
  constructor(private readonly templateCommandService: TemplateCommandService) {}

  async execute(command: PublishTemplateCommand) {
    return this.templateCommandService.publishTemplate(command);
  }
}
