import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateTemplateCommand } from '../create-template.command';
import { TemplateCommandService } from '../../services/template-command.service';

@CommandHandler(CreateTemplateCommand)
export class CreateTemplateHandler implements ICommandHandler<CreateTemplateCommand> {
  constructor(private readonly templateCommandService: TemplateCommandService) {}

  async execute(command: CreateTemplateCommand) {
    return this.templateCommandService.createTemplate(command);
  }
}
