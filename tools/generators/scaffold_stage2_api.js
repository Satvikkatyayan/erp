const fs = require('fs');
const path = require('path');

const WORKFLOW_API_DIR = 'd:\\erpvvinfratech\\apps\\api\\src\\core\\workflow\\api';

if (!fs.existsSync(WORKFLOW_API_DIR)) {
    fs.mkdirSync(WORKFLOW_API_DIR, { recursive: true });
}

const files = {
    [path.join(WORKFLOW_API_DIR, 'workflow-instance.controller.ts')]: `
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
`,
    [path.join(WORKFLOW_API_DIR, 'workflow-task.controller.ts')]: `
import { Controller, Get, Query } from '@nestjs/common';
import { WorkflowQueryService } from '../queries/workflow-query.service';

@Controller('api/v1/workflows/tasks')
export class WorkflowTaskController {
  constructor(private readonly queryService: WorkflowQueryService) {}

  @Get()
  async getTasks(@Query('userId') userId: string) {
    return this.queryService.getInbox(userId);
  }
}
`,
    [path.join(WORKFLOW_API_DIR, 'workflow-inbox.controller.ts')]: `
import { Controller, Get, Request } from '@nestjs/common';
import { WorkflowQueryService } from '../queries/workflow-query.service';

@Controller('api/v1/workflows/inbox')
export class WorkflowInboxController {
  constructor(private readonly queryService: WorkflowQueryService) {}

  @Get()
  async getInbox(@Request() req: any) {
    // Ideally user ID from JWT context or Request Context service
    return this.queryService.getInbox('current-user-id');
  }
}
`
};

for (const [filePath, content] of Object.entries(files)) {
    fs.writeFileSync(filePath, content.trim());
}

console.log('Stage 2 REST APIs scaffolded.');
