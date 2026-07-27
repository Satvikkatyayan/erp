import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';
import { ManagerPreferenceService } from '../services/manager-preference.service';

@Controller('mss/preferences')
@UseGuards(JwtAuthGuard)
export class MssPreferenceController {
  constructor(private readonly service: ManagerPreferenceService) {}

  @Post()
  async updatePreferences(@Req() req: any, @Body() payload: any) {
    return this.service.updatePreferences(req.context, payload);
  }
}
