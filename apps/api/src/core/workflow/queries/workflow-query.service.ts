import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowQueryService {
  async getInbox(userId: string) {
    // Get pending tasks for user
  }

  async getHistory(instanceId: string) {
    // Fetch snapshots and task histories
  }
  
  async getMetrics(definitionId: string) {
     // Return WorkflowMetrics
  }
}