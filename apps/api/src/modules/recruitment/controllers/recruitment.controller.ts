import { Controller, Post, Body, Param, Req } from '@nestjs/common';
import { RecruitmentLifecycleService } from '../services/recruitment-lifecycle.service';

@Controller('recruitment')
export class RecruitmentController {
  constructor(private readonly lifecycle: RecruitmentLifecycleService) {}

  @Post('apply')
  async apply(@Req() req, @Body() payload: any) {
    return this.lifecycle.processApplication(req.context, payload);
  }

  @Post('interviews/:id/schedule')
  async scheduleInterview(@Req() req, @Param('id') id: string, @Body() payload: any) {
    return this.lifecycle.scheduleInterview(req.context, id, payload);
  }

  @Post('offers/:id/accept')
  async acceptOffer(@Req() req, @Param('id') id: string) {
    return this.lifecycle.acceptOffer(req.context, id);
  }
}
