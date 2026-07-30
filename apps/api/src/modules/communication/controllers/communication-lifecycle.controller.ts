import { Controller, Post, Body, Headers, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { CommunicationMapper } from '../api/mappers/communication.mapper';
import { DispatchCommunicationRequestDto } from '../api/dtos/requests.dto';
import { DispatchCommunicationCommand } from '../commands/dispatch-communication.command';
import { DispatchCommunicationHandler } from '../commands/handlers/dispatch-communication.handler';
import { Channel } from '../domain/channel.enum';

@ApiTags('Communication Lifecycle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('communications')
export class CommunicationLifecycleController {
  constructor(
    private readonly mapper: CommunicationMapper,
    private readonly dispatchHandler: DispatchCommunicationHandler
  ) {}

  @Post('dispatch')
  @RequirePermissions('communication:dispatch')
  @ApiOperation({ summary: 'Dispatch a new communication manually' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 201, description: 'Communication dispatched successfully' })
  @HttpCode(201)
  async dispatchCommunication(
    @Headers('x-tenant-id') tenantId: string,
    @Body() dto: DispatchCommunicationRequestDto
  ) {
    // M1 backwards compatibility adaptation for M5
    const command = new DispatchCommunicationCommand(
      tenantId,
      dto.recipient || 'unknown-recipient',
      (dto.channel as Channel) || Channel.EMAIL,
      'legacy-template',
      dto.metadata || {}
    );
    const result = await this.dispatchHandler.execute(command);
    return this.mapper.success(result, 'Communication dispatched successfully');
  }
}
