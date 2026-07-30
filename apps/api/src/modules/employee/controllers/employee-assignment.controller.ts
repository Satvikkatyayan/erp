import { Controller, Get, Param, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { EmployeeMapper } from '../api/mappers/employee.mapper';

import { GetCurrentAssignmentQuery } from '../queries/get-current-assignment.query';
import { GetAssignmentHistoryQuery } from '../queries/get-assignment-history.query';

import { GetCurrentAssignmentHandler } from '../queries/handlers/get-current-assignment.handler';
import { GetAssignmentHistoryHandler } from '../queries/handlers/get-assignment-history.handler';

@ApiTags('Employee Assignment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('employees')
export class EmployeeAssignmentController {
  constructor(
    private readonly mapper: EmployeeMapper,
    private readonly currentAssignmentHandler: GetCurrentAssignmentHandler,
    private readonly assignmentHistoryHandler: GetAssignmentHistoryHandler
  ) {}

  @Get(':id/assignment')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get current assignment' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Current assignment returned' })
  async getCurrentAssignment(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetCurrentAssignmentQuery(tenantId, employeeId);
    const result = await this.currentAssignmentHandler.execute(query);
    return this.mapper.success(result.data, 'Current assignment retrieved');
  }

  @Get(':id/assignment/history')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get assignment history' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Assignment history returned' })
  async getAssignmentHistory(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const query = new GetAssignmentHistoryQuery(tenantId, employeeId);
    const result = await this.assignmentHistoryHandler.execute(query);
    return this.mapper.success(result.data, 'Assignment history retrieved');
  }
}
