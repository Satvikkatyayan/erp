import { Controller, Get, Param, Query, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { EmployeeMapper } from '../api/mappers/employee.mapper';
import { SearchEmployeesDto } from '../api/dtos/queries.dto';

import { GetEmployeeProfileQuery } from '../queries/get-employee-profile.query';
import { GetEmployeeSummaryQuery } from '../queries/get-employee-summary.query';
import { GetEmployeeTimelineQuery } from '../queries/get-employee-timeline.query';
import { SearchEmployeesQuery } from '../queries/search-employees.query';
import { GetEmploymentStatusQuery } from '../queries/get-employment-status.query';
import { GetExitInformationQuery } from '../queries/get-exit-information.query';

import { GetEmployeeProfileHandler } from '../queries/handlers/get-employee-profile.handler';
import { GetEmployeeSummaryHandler } from '../queries/handlers/get-employee-summary.handler';
import { GetEmployeeTimelineHandler } from '../queries/handlers/get-employee-timeline.handler';
import { SearchEmployeesHandler } from '../queries/handlers/search-employees.handler';
import { GetEmploymentStatusHandler } from '../queries/handlers/get-employment-status.handler';
import { GetExitInformationHandler } from '../queries/handlers/get-exit-information.handler';

@ApiTags('Employee Queries')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('employees')
export class EmployeeQueryController {
  constructor(
    private readonly mapper: EmployeeMapper,
    private readonly profileHandler: GetEmployeeProfileHandler,
    private readonly summaryHandler: GetEmployeeSummaryHandler,
    private readonly timelineHandler: GetEmployeeTimelineHandler,
    private readonly searchHandler: SearchEmployeesHandler,
    private readonly employmentStatusHandler: GetEmploymentStatusHandler,
    private readonly exitInfoHandler: GetExitInformationHandler
  ) {}

  @Get('search')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Search employees' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Search results returned' })
  async searchEmployees(@Headers('x-tenant-id') tenantId: string, @Query() queryDto: SearchEmployeesDto) {
    const filters = queryDto.filters ? JSON.parse(queryDto.filters) : {};
    const sort = queryDto.sort ? JSON.parse(queryDto.sort) : undefined;
    const query = new SearchEmployeesQuery(tenantId, filters, sort);
    const result = await this.searchHandler.execute(query);
    return this.mapper.success(result.data, 'Search successful');
  }

  @Get(':id')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employee profile' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Profile returned' })
  async getEmployeeProfile(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetEmployeeProfileQuery(tenantId, employeeId);
    const result = await this.profileHandler.execute(query);
    return this.mapper.success(result.data, 'Profile retrieved');
  }

  @Get(':id/summary')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employee summary' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Summary returned' })
  async getEmployeeSummary(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetEmployeeSummaryQuery(tenantId, employeeId);
    const result = await this.summaryHandler.execute(query);
    return this.mapper.success(result.data, 'Summary retrieved');
  }

  @Get(':id/timeline')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employee timeline' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Timeline returned' })
  async getEmployeeTimeline(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetEmployeeTimelineQuery(tenantId, employeeId);
    const result = await this.timelineHandler.execute(query);
    return this.mapper.success(result.data, 'Timeline retrieved');
  }

  @Get(':id/employment')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employment status' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employment status returned' })
  async getEmploymentStatus(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetEmploymentStatusQuery(tenantId, employeeId);
    const result = await this.employmentStatusHandler.execute(query);
    return this.mapper.success(result.data, 'Employment status retrieved');
  }

  @Get(':id/exit')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get exit information' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Exit info returned' })
  async getExitInformation(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetExitInformationQuery(tenantId, employeeId);
    const result = await this.exitInfoHandler.execute(query);
    return this.mapper.success(result.data, 'Exit information retrieved');
  }
}
