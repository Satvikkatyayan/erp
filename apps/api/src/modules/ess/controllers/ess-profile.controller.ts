import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { EmployeeProfileService } from '../services/employee-profile.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('ess/profile')
@UseGuards(JwtAuthGuard)
export class EssProfileController {
  constructor(
    private readonly profileService: EmployeeProfileService
  ) {}

  @Get()
  async getProfile(@Req() req: any) {
    const ctx = req.context;
    return this.profileService.getProfile(ctx);
  }
}
