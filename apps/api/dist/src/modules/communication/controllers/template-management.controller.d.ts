import { CommandBus } from '@nestjs/cqrs';
import { CreateTemplateRequestDto } from '../api/dtos/template-requests.dto';
import { TemplateMapper } from '../api/mappers/template.mapper';
export declare class TemplateManagementController {
    private readonly commandBus;
    private readonly templateMapper;
    constructor(commandBus: CommandBus, templateMapper: TemplateMapper);
    createTemplate(tenantId: string, payload: CreateTemplateRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/template-responses.dto").TemplateResponseDto;
    }>;
    publishTemplate(tenantId: string, templateId: string, versionId: string): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/template-responses.dto").TemplateVersionResponseDto;
    }>;
}
//# sourceMappingURL=template-management.controller.d.ts.map