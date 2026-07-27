import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { EmployeeDashboardService } from '../services/employee-dashboard.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('ess/dashboard')
@UseGuards(JwtAuthGuard)
export class EssDashboardController {
  constructor(
    private readonly dashboardService: EmployeeDashboardService
  ) {}

  @Get()
  async getDashboard(@Req() req: any) {
    const ctx = req.context;
    return this.dashboardService.getDashboard(ctx);
  }
}
