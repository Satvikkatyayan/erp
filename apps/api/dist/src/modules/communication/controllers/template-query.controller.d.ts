import { QueryBus } from '@nestjs/cqrs';
import { TemplateMapper } from '../api/mappers/template.mapper';
export declare class TemplateQueryController {
    private readonly queryBus;
    private readonly templateMapper;
    constructor(queryBus: QueryBus, templateMapper: TemplateMapper);
    getTemplates(tenantId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/template-responses.dto").TemplateResponseDto[];
    }>;
}
//# sourceMappingURL=template-query.controller.d.ts.map