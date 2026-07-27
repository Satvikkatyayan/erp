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