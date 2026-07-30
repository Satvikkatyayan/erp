import { Controller, Post, Body, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { RenderTemplateRequestDto } from '../api/dtos/render-requests.dto';
import { RenderTemplateQuery } from '../queries/render-template.query';
import { RenderMapper } from '../api/mappers/render.mapper';

@ApiTags('Communication Rendering Preview')
@Controller('communication/templates/:tenantId/:templateCode/preview')
export class TemplateRenderController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly renderMapper: RenderMapper
  ) {}

  @Post()
  @ApiOperation({ summary: 'Preview a rendered template' })
  async previewTemplate(
    @Param('tenantId') tenantId: string,
    @Param('templateCode') templateCode: string,
    @Body() payload: RenderTemplateRequestDto
  ) {
    const query = new RenderTemplateQuery(tenantId, templateCode, payload.payload || {});
    const result = await this.queryBus.execute(query);
    return this.renderMapper.success(
      this.renderMapper.mapToResponseDto(result),
      'Template preview rendered successfully'
    );
  }
}
