import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { WorkflowCommandService } from '../commands/workflow-command.service';
import { WorkflowQueryService } from '../queries/workflow-query.service';

@Controller('api/v1/workflows')
export class WorkflowInstanceController {
  constructor(
    private readonly commandService: WorkflowCommandService,
    private readonly queryService: WorkflowQueryService
  ) {}

  @Post(':id/pause')
  async pause(@Param('id') id: string) { return { status: 'paused', id }; }

  @Post(':id/resume')
  async resume(@Param('id') id: string) { return { status: 'resumed', id }; }

  @Post(':id/reopen')
  async reopen(@Param('id') id: string) { return { status: 'reopened', id }; }

  @Post(':id/escalate')
  async escalate(@Param('id') id: string) { return { status: 'escalated', id }; }

  @Post(':id/delegate')
  async delegate(@Param('id') id: string, @Body() payload: any) { return { status: 'delegated', id }; }

  @Post(':id/comment')
  async comment(@Param('id') id: string, @Body() payload: any) { return { status: 'comment_added', id }; }

  @Post(':id/attachments')
  async attachments(@Param('id') id: string, @Body() payload: any) { return { status: 'attachment_added', id }; }

  @Get(':id/history')
  async getHistory(@Param('id') id: string) { return this.queryService.getHistory(id); }

  @Get(':id/metrics')
  async getMetrics(@Param('id') id: string) { return this.queryService.getMetrics(id); }
}