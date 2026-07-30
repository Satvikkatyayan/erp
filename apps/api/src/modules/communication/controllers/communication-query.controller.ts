import { Controller, Get, Query, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { CommunicationMapper } from '../api/mappers/communication.mapper';
import { GetCommunicationHistoryQueryDto } from '../api/dtos/requests.dto';
import { GetCommunicationHistoryQuery } from '../queries/get-communication-history.query';
import { GetCommunicationHistoryHandler } from '../queries/handlers/get-communication-history.handler';

@ApiTags('Communication Query')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('communications')
export class CommunicationQueryController {
  constructor(
    private readonly mapper: CommunicationMapper,
    private readonly historyHandler: GetCommunicationHistoryHandler
  ) {}

  @Get('history')
  @RequirePermissions('communication:read')
  @ApiOperation({ summary: 'Get communication history' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Successfully retrieved communication history' })
  async getHistory(
    @Headers('x-tenant-id') tenantId: string,
    @Query() dto: GetCommunicationHistoryQueryDto
  ) {
    const query = new GetCommunicationHistoryQuery(tenantId, dto);
    const records = await this.historyHandler.execute(query);
    const responseDtos = this.mapper.mapToHistoryDtoList(records);
    return this.mapper.success(responseDtos, 'Communication history retrieved successfully');
  }
}
