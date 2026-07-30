import { Controller, Post, Body, Param, Headers, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiHeader, ApiBearerAuth } from '@nestjs/swagger';

import { JwtAuthGuard } from '../../../core/authentication/guards/jwt-auth.guard';
import { PermissionGuard } from '../../../core/authorization/guards/permission.guard';
import { RequirePermissions } from '../../../core/authorization/decorators/require-permissions.decorator';


import { 
  ApplyLeaveRequestDto, 
  ApproveLeaveRequestDto, 
  RejectLeaveRequestDto, 
  CancelLeaveRequestDto 
} from '../api/dtos/requests.dto';
import { LeaveMapper } from '../api/mappers/leave.mapper';

import { ApplyLeaveHandler } from '../commands/handlers/apply-leave.handler';
import { ApproveLeaveHandler } from '../commands/handlers/approve-leave.handler';
import { RejectLeaveHandler } from '../commands/handlers/reject-leave.handler';
import { CancelLeaveHandler } from '../commands/handlers/cancel-leave.handler';
import { ApplyLeaveCommand } from '../commands/apply-leave.command';
import { ApproveLeaveCommand } from '../commands/approve-leave.command';
import { RejectLeaveCommand } from '../commands/reject-leave.command';
import { CancelLeaveCommand } from '../commands/cancel-leave.command';

@ApiTags('Leave Lifecycle')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionGuard)
@Controller('leave')
export class LeaveLifecycleController {
  constructor(
    private readonly mapper: LeaveMapper,
    private readonly applyLeaveHandler: ApplyLeaveHandler,
    private readonly approveLeaveHandler: ApproveLeaveHandler,
    private readonly rejectLeaveHandler: RejectLeaveHandler,
    private readonly cancelLeaveHandler: CancelLeaveHandler,
  ) {}

  @Post('apply')
  @RequirePermissions('leave:apply')
  @HttpCode(201)
  @ApiOperation({ summary: 'Apply for a new leave request' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 201, description: 'Leave request applied successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async applyLeave(
    @Headers('x-tenant-id') tenantId: string,
    @Body() payload: ApplyLeaveRequestDto
  ) {
    const command = new ApplyLeaveCommand(tenantId, payload);
    await this.applyLeaveHandler.execute(command);
    return this.mapper.success(null, 'Leave request applied successfully');
  }

  @Post(':id/approve')
  @RequirePermissions('leave:approve')
  @HttpCode(200)
  @ApiOperation({ summary: 'Approve an existing leave request' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Leave request approved successfully' })
  @ApiResponse({ status: 404, description: 'Leave Request not found' })
  async approveLeave(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() payload: ApproveLeaveRequestDto
  ) {
    const command = new ApproveLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
    await this.approveLeaveHandler.execute(command);
    return this.mapper.success(null, 'Leave request approved successfully');
  }

  @Post(':id/reject')
  @RequirePermissions('leave:reject')
  @HttpCode(200)
  @ApiOperation({ summary: 'Reject an existing leave request' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Leave request rejected successfully' })
  @ApiResponse({ status: 404, description: 'Leave Request not found' })
  async rejectLeave(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() payload: RejectLeaveRequestDto
  ) {
    const command = new RejectLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
    await this.rejectLeaveHandler.execute(command);
    return this.mapper.success(null, 'Leave request rejected successfully');
  }

  @Post(':id/cancel')
  @RequirePermissions('leave:cancel')
  @HttpCode(200)
  @ApiOperation({ summary: 'Cancel an existing leave request' })
  @ApiHeader({ name: 'x-tenant-id', required: true })
  @ApiResponse({ status: 200, description: 'Leave request cancelled successfully' })
  @ApiResponse({ status: 404, description: 'Leave Request not found' })
  async cancelLeave(
    @Headers('x-tenant-id') tenantId: string,
    @Param('id') id: string,
    @Body() payload: CancelLeaveRequestDto
  ) {
    const command = new CancelLeaveCommand(tenantId, { leaveRequestId: id, ...payload });
    await this.cancelLeaveHandler.execute(command);
    return this.mapper.success(null, 'Leave request cancelled successfully');
  }
}
