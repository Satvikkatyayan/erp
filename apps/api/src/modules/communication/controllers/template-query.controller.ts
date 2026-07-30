import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { GetTemplatesQuery } from '../queries/get-templates.query';
import { TemplateMapper } from '../api/mappers/template.mapper';

@ApiTags('Communication Templates Query')
@Controller('communication/templates')
export class TemplateQueryController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly templateMapper: TemplateMapper
  ) {}

  @Get(':tenantId')
  @ApiOperation({ summary: 'List all templates' })
  async getTemplates(
    @Param('tenantId') tenantId: string
  ) {
    const query = new GetTemplatesQuery(tenantId);
    const results = await this.queryBus.execute(query);
    return this.templateMapper.success(this.templateMapper.mapToTemplateDtoList(results), 'Templates retrieved successfully');
  }
}
