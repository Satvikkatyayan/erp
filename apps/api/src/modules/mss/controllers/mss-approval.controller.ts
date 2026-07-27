import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ManagerApprovalService } from '../services/manager-approval.service';

@Controller('mss/approvals')
@UseGuards(JwtAuthGuard)
export class MssApprovalController {
  constructor(private readonly service: ManagerApprovalService) {}

  @Get()
  async getApprovals(@Req() req: any) {
    return this.service.getPendingApprovals(req.context);
  }

  @Post(':id/:action')
  async processApproval(@Req() req: any, @Param('id') id: string, @Param('action') action: string, @Body() body: any) {
    return this.service.processApproval(req.context, id, action.toUpperCase() as any, body?.reason);
  }
}
