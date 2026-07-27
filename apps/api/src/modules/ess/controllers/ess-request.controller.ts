import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { EmployeeRequestService } from '../services/employee-request.service';
import { JwtAuthGuard } from '../../../auth/guards/jwt-auth.guard';

@Controller('ess/requests')
@UseGuards(JwtAuthGuard)
export class EssRequestController {
  constructor(
    private readonly requestService: EmployeeRequestService
  ) {}

  @Post('leave')
  async submitLeave(@Req() req: any, @Body() payload: any) {
    const ctx = req.context;
    return this.requestService.submitLeaveRequest(ctx, payload);
  }

  @Post('expense')
  async submitExpense(@Req() req: any, @Body() payload: any) {
    const ctx = req.context;
    return this.requestService.submitExpenseClaim(ctx, payload);
  }
}
