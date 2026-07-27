import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ExpenseReadFacade } from '../facades/expense-read.facade';
import { QueryResponse, PagedResponse } from '../dto/responses/standard.response';
import { Roles } from '../decorators/roles.decorator';

@ApiTags('Travel Queries')
@Controller('query/travel')
export class TravelQueryController {
  constructor(private readonly readFacade: ExpenseReadFacade) {}

  @Get('history')
  @Roles('Employee')
  @ApiOperation({ summary: 'Get travel history' })
  @ApiResponse({ type: PagedResponse })
  async getTravelHistory(@Query() params: any): Promise<PagedResponse> {
    const data = await this.readFacade.travelQuery.getTravelHistory(params);
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('active')
  @Roles('Employee')
  @ApiOperation({ summary: 'Get active travel' })
  @ApiResponse({ type: PagedResponse })
  async getActiveTravel(@Query() params: any): Promise<PagedResponse> {
    const data = await this.readFacade.travelQuery.getUpcomingTravel(params);
    return { data, totalCount: data.length, page: 1, pageSize: 10 };
  }

  @Get('dashboard')
  @Roles('Employee')
  @ApiOperation({ summary: 'Get travel dashboard' })
  @ApiResponse({ type: QueryResponse })
  async getTravelDashboard(): Promise<QueryResponse> {
    const data = await this.readFacade.travelQuery.getTravelDashboard('');
    return { data };
  }
}
