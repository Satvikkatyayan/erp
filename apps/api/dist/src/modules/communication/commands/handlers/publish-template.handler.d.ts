import { ICommandHandler } from '@nestjs/cqrs';
import { PublishTemplateCommand } from '../publish-template.command';
import { TemplateCommandService } from '../../services/template-command.service';
export declare class PublishTemplateHandler implements ICommandHandler<PublishTemplateCommand> {
    private readonly templateCommandService;
    constructor(templateCommandService: TemplateCommandService);
    execute(command: PublishTemplateCommand): Promise<any>;
}
//# sourceMappingURL=publish-template.handler.d.ts.map