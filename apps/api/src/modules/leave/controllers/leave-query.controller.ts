import { Controller, Get, Query, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';


import { PaginationDto, SortDto, LeaveFilterDto, SearchLeaveRequestsDto } from '../api/dtos/queries.dto';
import { LeaveMapper } from '../api/mappers/leave.mapper';

import { GetLeaveRequestHandler } from '../queries/handlers/get-leave-request.handler';
import { SearchLeaveRequestsHandler } from '../queries/handlers/search-leave-requests.handler';
import { GetLeaveBalancesHandler } from '../queries/handlers/get-leave-balances.handler';
import { GetLeaveRequestQuery } from '../queries/get-leave-request.query';
import { SearchLeaveRequestsQuery } from '../queries/search-leave-requests.query';
import { GetLeaveBalancesQuery } from '../queries/get-leave-balances.query';

@ApiTags('Leave Queries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('leave')
export class LeaveQueryController {
  constructor(
    private readonly mapper: LeaveMapper,
    private readonly getLeaveRequestHandler: GetLeaveRequestHandler,
    private readonly searchLeaveRequestsHandler: SearchLeaveRequestsHandler,
    private readonly getLeaveBalancesHandler: GetLeaveBalancesHandler,
  ) {}

  @Get('requests/:id')
  @RequirePermissions('leave:read')
  @ApiOperation({ summary: 'Get a specific leave request by ID' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Returns the leave request details' })
  @ApiResponse({ status: 404, description: 'Leave request not found' })
  async getLeaveRequest(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string
  ) {
    const query = new GetLeaveRequestQuery(tenantId, id);
    const result = await this.getLeaveRequestHandler.execute(query);
    return this.mapper.success(result.data, 'Leave request retrieved');
  }

  @Get('requests')
  @RequirePermissions('leave:read')
  @ApiOperation({ summary: 'Search and filter leave requests' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Returns a paginated list of leave requests' })
  async searchLeaveRequests(
    @Headers('x-tenant-id') tenantId: string,
    @Query() pagination: PaginationDto,
    @Query() sort: SortDto,
    @Query() filters: LeaveFilterDto,
    @Query() searchParams: SearchLeaveRequestsDto,
  ) {
    const queryParams = { ...pagination, ...sort, ...filters, ...searchParams };
    const query = new SearchLeaveRequestsQuery(tenantId, queryParams, sort);
    const result = await this.searchLeaveRequestsHandler.execute(query);
    return this.mapper.success(result.data, 'Search successful');
  }

  @Get('balances/:employeeId')
  @RequirePermissions('leave:read')
  @ApiOperation({ summary: 'Get accrued leave balances for an employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Returns the leave balance details' })
  @ApiResponse({ status: 404, description: 'Employee not found' })
  async getLeaveBalances(
    @Headers('x-tenant-id') tenantId: string,
    @Param('employeeId') employeeId: string
  ) {
    const query = new GetLeaveBalancesQuery(tenantId, employeeId);
    const result = await this.getLeaveBalancesHandler.execute(query);
    return this.mapper.success(result.data, 'Leave balance retrieved');
  }
}
