import { ICommandHandler } from '@nestjs/cqrs';
import { CreateTemplateCommand } from '../create-template.command';
import { TemplateCommandService } from '../../services/template-command.service';
export declare class CreateTemplateHandler implements ICommandHandler<CreateTemplateCommand> {
    private readonly templateCommandService;
    constructor(templateCommandService: TemplateCommandService);
    execute(command: CreateTemplateCommand): Promise<any>;
}
//# sourceMappingURL=create-template.handler.d.ts.map