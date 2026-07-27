import { Injectable } from '@nestjs/common';

@Injectable()
export class WorkflowCommandService {
  async startInstance(definitionId: string, entityId: string, payload: any) {
    // Logic to initialize workflow, evaluate variables, and find initial state
  }

  async cancelInstance(instanceId: string, reason: string) {
    // Cancellation logic with compensation hooks
  }

  async completeTask(taskId: string, payload: any) {
    // Task completion, validation, state transition logic
  }
}