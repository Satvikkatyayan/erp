import { CommunicationTemplateRepository } from '../repositories/communication-template.repository';
import { CreateTemplateCommand } from '../commands/create-template.command';
import { PublishTemplateCommand } from '../commands/publish-template.command';
export declare class TemplateCommandService {
    private readonly repository;
    constructor(repository: CommunicationTemplateRepository);
    createTemplate(command: CreateTemplateCommand): Promise<any>;
    publishTemplate(command: PublishTemplateCommand): Promise<any>;
}
//# sourceMappingURL=template-command.service.d.ts.map