import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ManagerFacade } from '../facades/manager.facade';

@Controller('mss/team')
@UseGuards(JwtAuthGuard)
export class MssTeamController {
  constructor(private readonly facade: ManagerFacade) {}

  @Get()
  async getDirectory(@Req() req: any) {
    return this.facade.getTeamDirectory(req.context);
  }
}
