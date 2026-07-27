import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EmployeeSessionService } from '../services/employee-session.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('ess/sessions')
@UseGuards(JwtAuthGuard)
export class EssSessionController {
  constructor(
    private readonly sessionService: EmployeeSessionService
  ) {}

  @Get()
  async getActiveSessions(@Req() req: any) {
    const ctx = req.context;
    return this.sessionService.getActiveSessions(ctx);
  }

  @Post('register-device')
  async registerDevice(@Req() req: any, @Body() body: { deviceId: string; deviceName: string }) {
    const ctx = req.context;
    return this.sessionService.registerDevice(ctx, body.deviceId, body.deviceName);
  }
}
