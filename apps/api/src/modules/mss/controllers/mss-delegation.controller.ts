import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ManagerDelegationService } from '../services/manager-delegation.service';

@Controller('mss/delegations')
@UseGuards(JwtAuthGuard)
export class MssDelegationController {
  constructor(private readonly service: ManagerDelegationService) {}

  @Post()
  async createDelegation(@Req() req: any, @Body() payload: any) {
    return this.service.createDelegation(req.context, payload);
  }
}
