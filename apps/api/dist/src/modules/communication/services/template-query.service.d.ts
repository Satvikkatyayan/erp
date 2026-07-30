import { CommunicationTemplateRepository } from '../repositories/communication-template.repository';
import { ResolveTemplateQuery } from '../queries/resolve-template.query';
import { GetTemplatesQuery } from '../queries/get-templates.query';
export declare class TemplateQueryService {
    private readonly repository;
    constructor(repository: CommunicationTemplateRepository);
    getTemplates(query: GetTemplatesQuery): Promise<any>;
    resolveTemplate(query: ResolveTemplateQuery): Promise<{
        template: {
            id: any;
            code: any;
            name: any;
            channel: any;
        };
        version: any;
    }>;
}
//# sourceMappingURL=template-query.service.d.ts.map