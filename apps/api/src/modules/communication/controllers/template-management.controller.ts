import { Controller, Post, Body, Param, Put } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateTemplateRequestDto } from '../api/dtos/template-requests.dto';
import { CreateTemplateCommand } from '../commands/create-template.command';
import { PublishTemplateCommand } from '../commands/publish-template.command';
import { TemplateMapper } from '../api/mappers/template.mapper';

@ApiTags('Communication Templates Management')
@Controller('communication/templates')
export class TemplateManagementController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly templateMapper: TemplateMapper
  ) {}

  @Post(':tenantId')
  @ApiOperation({ summary: 'Create a new template' })
  async createTemplate(
    @Param('tenantId') tenantId: string,
    @Body() payload: CreateTemplateRequestDto
  ) {
    const command = new CreateTemplateCommand(tenantId, payload);
    const result = await this.commandBus.execute(command);
    return this.templateMapper.success(this.templateMapper.mapToTemplateDto(result), 'Template created successfully');
  }

  @Put(':tenantId/:templateId/versions/:versionId/publish')
  @ApiOperation({ summary: 'Publish a draft template version' })
  async publishTemplate(
    @Param('tenantId') tenantId: string,
    @Param('templateId') templateId: string,
    @Param('versionId') versionId: string
  ) {
    const command = new PublishTemplateCommand(tenantId, templateId, versionId);
    const result = await this.commandBus.execute(command);
    return this.templateMapper.success(this.templateMapper.mapToVersionDto(result), 'Template published successfully');
  }
}
