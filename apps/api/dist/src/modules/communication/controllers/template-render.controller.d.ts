import { QueryBus } from '@nestjs/cqrs';
import { RenderTemplateRequestDto } from '../api/dtos/render-requests.dto';
import { RenderMapper } from '../api/mappers/render.mapper';
export declare class TemplateRenderController {
    private readonly queryBus;
    private readonly renderMapper;
    constructor(queryBus: QueryBus, renderMapper: RenderMapper);
    previewTemplate(tenantId: string, templateCode: string, payload: RenderTemplateRequestDto): Promise<{
        success: boolean;
        message: string;
        data: import("../api/dtos/render-responses.dto").RenderResponseDto;
    }>;
}
//# sourceMappingURL=template-render.controller.d.ts.map