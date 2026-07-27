import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseFacade } from '../facades/expense.facade';
import { TravelMapper } from '../mappers/travel.mapper';
import { CreateTravelRequestDto, UpdateTravelDto } from '../dto/requests/travel.dto';
import { CommandResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Travel')
@Controller('travel')
export class TravelController {
  constructor(
    private readonly facade: ExpenseFacade,
    private readonly mapper: TravelMapper,
  ) {}

  @Post()
  @Roles('Employee')
  @ApiOperation({ summary: 'Create travel request' })
  @ApiResponse({ type: CommandResponse })
  async createTravel(@Body() dto: CreateTravelRequestDto): Promise<CommandResponse> {
    const command = this.mapper.toCreateCommand(dto);
    await this.facade.executeCommand('CREATE_TRAVEL', command);
    return { success: true };
  }

  @Put(':id')
  @Roles('Employee')
  @ApiOperation({ summary: 'Update itinerary' })
  @ApiResponse({ type: CommandResponse })
  async updateTravel(@Param('id') id: string, @Body() dto: UpdateTravelDto): Promise<CommandResponse> {
    const command = this.mapper.toUpdateCommand(id, dto);
    await this.facade.executeCommand('UPDATE_TRAVEL', command);
    return { success: true };
  }

  @Post(':id/submit')
  @Roles('Employee')
  @ApiOperation({ summary: 'Submit request' })
  @ApiResponse({ type: CommandResponse })
  async submitTravel(@Param('id') id: string): Promise<CommandResponse> {
    await this.facade.executeCommand('SUBMIT_TRAVEL', { id });
    return { success: true };
  }

  @Post(':id/cancel')
  @Roles('Employee')
  @ApiOperation({ summary: 'Cancel request' })
  @ApiResponse({ type: CommandResponse })
  async cancelTravel(@Param('id') id: string): Promise<CommandResponse> {
    await this.facade.executeCommand('CANCEL_TRAVEL', { id });
    return { success: true };
  }

  @Post(':id/bookings')
  @Roles('Employee')
  @ApiOperation({ summary: 'Attach bookings' })
  @ApiResponse({ type: CommandResponse })
  async attachBookings(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('ATTACH_BOOKINGS', { id, ...dto });
    return { success: true };
  }

  @Post(':id/advance')
  @Roles('Employee')
  @ApiOperation({ summary: 'Request travel advance' })
  @ApiResponse({ type: CommandResponse })
  async requestAdvance(@Param('id') id: string, @Body() dto: any): Promise<CommandResponse> {
    await this.facade.executeCommand('REQUEST_ADVANCE', { id, ...dto });
    return { success: true };
  }
}
