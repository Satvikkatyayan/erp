import { Controller, Post, Body } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DispatchCommunicationDto } from '../dtos/dispatch-communication.dto';
import { DispatchCommunicationCommand } from '../../commands/dispatch-communication.command';
import { DeliveryResult } from '../../domain/delivery-result';

@ApiTags('Communication Delivery')
@Controller('communication/delivery')
export class DeliveryController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('dispatch')
  @ApiOperation({ summary: 'Dispatch a communication message to a recipient' })
  @ApiResponse({ status: 201, description: 'Message dispatched successfully' })
  async dispatch(@Body() dto: DispatchCommunicationDto): Promise<DeliveryResult> {
    const command = new DispatchCommunicationCommand(
      dto.tenantId,
      dto.recipient,
      dto.channel,
      dto.templateCode,
      dto.payload || {}
    );

    return this.commandBus.execute(command);
  }
}
