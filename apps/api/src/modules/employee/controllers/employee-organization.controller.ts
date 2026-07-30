import { Controller, Get, Param, Query, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { EmployeeMapper } from '../api/mappers/employee.mapper';

import { GetEmployeesByManagerQuery } from '../queries/get-employees-by-manager.query';
import { GetEmployeesByDepartmentQuery } from '../queries/get-employees-by-department.query';
import { GetEmployeesByProjectQuery } from '../queries/get-employees-by-project.query';
import { GetEmployeesByOrganizationQuery } from '../queries/get-employees-by-organization.query';
import { GetEmployeesByBranchQuery } from '../queries/get-employees-by-branch.query';

import { GetEmployeesByManagerHandler } from '../queries/handlers/get-employees-by-manager.handler';
import { GetEmployeesByDepartmentHandler } from '../queries/handlers/get-employees-by-department.handler';
import { GetEmployeesByProjectHandler } from '../queries/handlers/get-employees-by-project.handler';
import { GetEmployeesByOrganizationHandler } from '../queries/handlers/get-employees-by-organization.handler';
import { GetEmployeesByBranchHandler } from '../queries/handlers/get-employees-by-branch.handler';

@ApiTags('Employee Organization')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('employees')
export class EmployeeOrganizationController {
  constructor(
    private readonly mapper: EmployeeMapper,
    private readonly managerHandler: GetEmployeesByManagerHandler,
    private readonly departmentHandler: GetEmployeesByDepartmentHandler,
    private readonly projectHandler: GetEmployeesByProjectHandler,
    private readonly orgHandler: GetEmployeesByOrganizationHandler,
    private readonly branchHandler: GetEmployeesByBranchHandler
  ) {}

  @Get('manager/:managerId')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employees by manager' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'List of employees returned' })
  async getByManager(@Headers('x-tenant-id') tenantId: string, @Param('managerId') managerId: string) {
    const query = new GetEmployeesByManagerQuery(tenantId, managerId);
    const result = await this.managerHandler.execute(query);
    return this.mapper.success(result.data, 'Employees retrieved by manager');
  }

  @Get('department/:departmentId')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employees by department' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'List of employees returned' })
  async getByDepartment(@Headers('x-tenant-id') tenantId: string, @Param('departmentId') departmentId: string) {
    const query = new GetEmployeesByDepartmentQuery(tenantId, departmentId);
    const result = await this.departmentHandler.execute(query);
    return this.mapper.success(result.data, 'Employees retrieved by department');
  }

  @Get('project/:projectId')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employees by project' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'List of employees returned' })
  async getByProject(@Headers('x-tenant-id') tenantId: string, @Param('projectId') projectId: string) {
    const query = new GetEmployeesByProjectQuery(tenantId, projectId);
    const result = await this.projectHandler.execute(query);
    return this.mapper.success(result.data, 'Employees retrieved by project');
  }

  @Get('organization/:organizationId')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employees by organization' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'List of employees returned' })
  async getByOrganization(@Headers('x-tenant-id') tenantId: string, @Param('organizationId') organizationId: string) {
    const query = new GetEmployeesByOrganizationQuery(tenantId, organizationId);
    const result = await this.orgHandler.execute(query);
    return this.mapper.success(result.data, 'Employees retrieved by organization');
  }

  @Get('branch/:branchId')
  @RequirePermissions('employee:read')
  @ApiOperation({ summary: 'Get employees by branch' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'List of employees returned' })
  async getByBranch(@Headers('x-tenant-id') tenantId: string, @Param('branchId') branchId: string) {
    const query = new GetEmployeesByBranchQuery(tenantId, branchId);
    const result = await this.branchHandler.execute(query);
    return this.mapper.success(result.data, 'Employees retrieved by branch');
  }
}
