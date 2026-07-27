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