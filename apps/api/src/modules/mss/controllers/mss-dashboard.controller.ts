import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ManagerFacade } from '../facades/manager.facade';

@Controller('mss/dashboard')
@UseGuards(JwtAuthGuard)
export class MssDashboardController {
  constructor(private readonly facade: ManagerFacade) {}

  @Get()
  async getDashboard(@Req() req: any) {
    return this.facade.getDashboard(req.context);
  }
}
