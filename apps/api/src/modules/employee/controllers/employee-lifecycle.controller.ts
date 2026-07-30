import { Controller, Post, Body, Param, Headers, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';

import { EmployeeMapper } from '../api/mappers/employee.mapper';
import {
  OnboardEmployeeRequestDto,
  JoinEmployeeRequestDto,
  ConfirmEmployeeRequestDto,
  TransferEmployeeRequestDto,
  PromoteEmployeeRequestDto,
  ResignEmployeeRequestDto,
  TerminateEmployeeRequestDto,
  ExitEmployeeRequestDto,
  RehireEmployeeRequestDto
} from '../api/dtos/requests.dto';

import { OnboardEmployeeCommand } from '../commands/onboard-employee.command';
import { JoinEmployeeCommand } from '../commands/join-employee.command';
import { BeginProbationCommand } from '../commands/begin-probation.command';
import { ConfirmEmployeeCommand } from '../commands/confirm-employee.command';
import { TransferEmployeeCommand } from '../commands/transfer-employee.command';
import { PromoteEmployeeCommand } from '../commands/promote-employee.command';
import { ResignEmployeeCommand } from '../commands/resign-employee.command';
import { TerminateEmployeeCommand } from '../commands/terminate-employee.command';
import { ExitEmployeeCommand } from '../commands/exit-employee.command';
import { RehireEmployeeCommand } from '../commands/rehire-employee.command';

import { OnboardEmployeeHandler } from '../commands/handlers/onboard-employee.handler';
import { JoinEmployeeHandler } from '../commands/handlers/join-employee.handler';
import { BeginProbationHandler } from '../commands/handlers/begin-probation.handler';
import { ConfirmEmployeeHandler } from '../commands/handlers/confirm-employee.handler';
import { TransferEmployeeHandler } from '../commands/handlers/transfer-employee.handler';
import { PromoteEmployeeHandler } from '../commands/handlers/promote-employee.handler';
import { ResignEmployeeHandler } from '../commands/handlers/resign-employee.handler';
import { TerminateEmployeeHandler } from '../commands/handlers/terminate-employee.handler';
import { ExitEmployeeHandler } from '../commands/handlers/exit-employee.handler';
import { RehireEmployeeHandler } from '../commands/handlers/rehire-employee.handler';

@ApiTags('Employee Lifecycle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('employees')
export class EmployeeLifecycleController {
  constructor(
    private readonly mapper: EmployeeMapper,
    private readonly onboardHandler: OnboardEmployeeHandler,
    private readonly joinHandler: JoinEmployeeHandler,
    private readonly probationHandler: BeginProbationHandler,
    private readonly confirmHandler: ConfirmEmployeeHandler,
    private readonly transferHandler: TransferEmployeeHandler,
    private readonly promoteHandler: PromoteEmployeeHandler,
    private readonly resignHandler: ResignEmployeeHandler,
    private readonly terminateHandler: TerminateEmployeeHandler,
    private readonly exitHandler: ExitEmployeeHandler,
    private readonly rehireHandler: RehireEmployeeHandler
  ) {}

  @Post('onboard')
  @RequirePermissions('employee:onboard')
  @ApiOperation({ summary: 'Onboard a new employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 201, description: 'Employee onboarded successfully' })
  async onboardEmployee(@Headers('x-tenant-id') tenantId: string, @Body() dto: OnboardEmployeeRequestDto) {
    const command = new OnboardEmployeeCommand(tenantId, dto.data);
    await this.onboardHandler.execute(command);
    return this.mapper.success(null, 'Employee onboarded successfully');
  }

  @Post(':id/join')
  @RequirePermissions('employee:join')
  @ApiOperation({ summary: 'Mark employee as joined' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee joined successfully' })
  @HttpCode(200)
  async joinEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: JoinEmployeeRequestDto) {
    const command = new JoinEmployeeCommand(tenantId, employeeId);
    await this.joinHandler.execute(command);
    return this.mapper.success(null, 'Employee joined successfully');
  }

  @Post(':id/probation')
  @RequirePermissions('employee:probation')
  @ApiOperation({ summary: 'Begin employee probation' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Probation started successfully' })
  @HttpCode(200)
  async beginProbation(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string) {
    const command = new BeginProbationCommand(tenantId, employeeId);
    await this.probationHandler.execute(command);
    return this.mapper.success(null, 'Probation started successfully');
  }

  @Post(':id/confirm')
  @RequirePermissions('employee:confirm')
  @ApiOperation({ summary: 'Confirm employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee confirmed successfully' })
  @HttpCode(200)
  async confirmEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: ConfirmEmployeeRequestDto) {
    const command = new ConfirmEmployeeCommand(tenantId, employeeId, dto.confirmedBy, new Date(dto.confirmedAt));
    await this.confirmHandler.execute(command);
    return this.mapper.success(null, 'Employee confirmed successfully');
  }

  @Post(':id/transfer')
  @RequirePermissions('employee:transfer')
  @ApiOperation({ summary: 'Transfer employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee transferred successfully' })
  @HttpCode(200)
  async transferEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: TransferEmployeeRequestDto) {
    const command = new TransferEmployeeCommand(tenantId, employeeId, dto.newAssignmentData);
    await this.transferHandler.execute(command);
    return this.mapper.success(null, 'Employee transferred successfully');
  }

  @Post(':id/promote')
  @RequirePermissions('employee:promote')
  @ApiOperation({ summary: 'Promote employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee promoted successfully' })
  @HttpCode(200)
  async promoteEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: PromoteEmployeeRequestDto) {
    const command = new PromoteEmployeeCommand(tenantId, employeeId, dto.newAssignmentData);
    await this.promoteHandler.execute(command);
    return this.mapper.success(null, 'Employee promoted successfully');
  }

  @Post(':id/resign')
  @RequirePermissions('employee:resign')
  @ApiOperation({ summary: 'Mark employee as resigned' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee resigned successfully' })
  @HttpCode(200)
  async resignEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: ResignEmployeeRequestDto) {
    const command = new ResignEmployeeCommand(tenantId, employeeId, dto.resignationDate);
    await this.resignHandler.execute(command);
    return this.mapper.success(null, 'Employee resigned successfully');
  }

  @Post(':id/terminate')
  @RequirePermissions('employee:terminate')
  @ApiOperation({ summary: 'Terminate employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee terminated successfully' })
  @HttpCode(200)
  async terminateEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: TerminateEmployeeRequestDto) {
    const command = new TerminateEmployeeCommand(tenantId, employeeId, dto.terminationDate);
    await this.terminateHandler.execute(command);
    return this.mapper.success(null, 'Employee terminated successfully');
  }

  @Post(':id/exit')
  @RequirePermissions('employee:exit')
  @ApiOperation({ summary: 'Process employee exit' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee exit processed successfully' })
  @HttpCode(200)
  async exitEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: ExitEmployeeRequestDto) {
    const command = new ExitEmployeeCommand(tenantId, employeeId, dto.exitDate);
    await this.exitHandler.execute(command);
    return this.mapper.success(null, 'Employee exit processed successfully');
  }

  @Post(':id/rehire')
  @RequirePermissions('employee:rehire')
  @ApiOperation({ summary: 'Rehire an exited employee' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Employee rehired successfully' })
  @HttpCode(200)
  async rehireEmployee(@Headers('x-tenant-id') tenantId: string, @Param('id') employeeId: string, @Body() dto: RehireEmployeeRequestDto) {
    const command = new RehireEmployeeCommand(tenantId, employeeId, dto.initialAssignmentData);
    await this.rehireHandler.execute(command);
    return this.mapper.success(null, 'Employee rehired successfully');
  }
}
